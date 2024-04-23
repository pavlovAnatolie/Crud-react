//serve per importare gli state
import {useState} from 'react';

//alunno= attributo(oggetto/istanza) , popolaAlunni= metodo
export default function Alunno({alunno, popolaAlunni}){
//variabili di stato che possono variare nel corso dell'esecuzione
const [contatore, setContatore] = useState[alunno.id];
const [inCancellazione, setInCancellazione] = useState[false];
const [richiestaConferma, setRichiestaConferma] = useState[false];


//funzione che viene chiamata quando viene cliccato un certo bottone e che permette di incrementare il contatore che essendo una variabile di stato cambiera a vista di occhi
function incrementaVoto(){
    setContatore(contatore + 1);
}

//funzione che serve per cancellare un alunno async perche ce un metdodo await al interno percio bisogna gestire il fatto che sia assincrono
async function cancellaAlunno(){

    //metto la variabile di stato a false nel caso in cui sia a true(disabilta il messaggio)
    setRichiestaConferma(false);

    //metto la variabile inCancellazione a true nel moneto in cui clicco il bottone intereessato
    setInCancellazione(true);

    //metodo che serve ad andare a interoggare una determinata pagina e avere in ritorno (in questo caso tutti gli alluni in formato json)
    const response = await fetch(`http://localhost:8080/alunni/${alunno.id}`,{method:'GET'})
    //ridisegno gli elementi uttilizzando il metdo (popolaAlunni())
    popolaAlunni();
}

//funzione che serve per settare lo stato in cui ci si trova per l'eleiminazione
function richiesta(){
    setRichiestaConferma(true);
}

//funzione che serve per annullare la richiesta di cacellazione
function annullaRichiesta(){
    setRichiestaConferma(false);
}
//elemento che viene ritorna una vota che viene chiamato nel app.js che rappresenta la pagina da disegnare
return(
    //renderizzatata dopo ogni modifica
    <div>//contenitore
        {alunno.nome} {alunno.cognome} //{} perche rappresenta le variabili in js e nome, cognome sono attoributi del tag alunno

        //al click del bottone chiamop il metodo {incrementaVoto} e faccio vedere in tempo reale il valore {contatore}
        <button onClick={incrementaVoto}>Aumenta{contatore}</button>

        //se richiestaConfermaì==true allora creo l'elemento del messaagio di cancellazione altrimenti vorra dire che dovro creare il tasto cacella che porterà ,di seiguito, ad avere richiestaConferma==true
        { richiestaConferma ?
            <span> Sei Sicuro?
                <button onClick={cancellaAlunno} >si</button>
                <button onClick={annullaRichiesta}>no</button>
            </span>
        :

            <button onClick={richiesta}>Cancella</button>
        }
        { inCancellazione && //se inCancelazione allora stampo lo span altrimenti non succede nulla fino a quando una successiva interazione mi porterà ad avere inCacelazione==true
            <span>in fase di Cancellazione</span>  
        }
    </div>
)
}
