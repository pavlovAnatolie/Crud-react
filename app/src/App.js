import './App.css'; //importo lo stile css
import Alunno from './Alunno'; //importo il nostro elemento "Alunno"
import {useState, useEffect} from 'react'; //importo useState(variabili di stato) e useEffect dalla libreria React

//funzione principale che contine la pagina 
function App() {

  //use effect è un metodo che deve essere eseguito al inizio per caricare e renderzzare la pagina
  useEffect(() => {
    //infatti si usa il metodo popolaAlunni 
    popolaAlunni();
  },[])
  //variabili di stato alunni(array voto) e pronto(settato a false)
  const [alunni,setAlunni] = useState([]);
  const [pronto,setPronto] = useState(false);


  //metodo popolaAlunni che permette di disegnare la pagina e di prendere il contenuto
  async function popolaAlunni(){

    //metodo che mi permentte di fare una specie di query e di prendere dal db i alluni da disegnare il formato json
    const response = await fetch("http://locahost:8080/alunni",{method: "GET"});
    const array = await response.json();


    //una volta preso gli allunni posso mettergli all'interno della variabile state
    setAlunni(array);

    //è segnalo il fatto di esser pronto a disegnare la pagina
    setPronto(true);
  }

  return(
    <div className='App'>
      {
        pronto ? //se pronto allora scorro tutti gli alunni e per ognuno di loro creo un elemento alunno che passera al elemetoclsse alunno (l'oggetto alunno con tutti i campi, il metodo poopolaAlunni che sevira nel caso in cui si dovra fare un'eliminiazinone
                  // e percio si dovra ridiseganre la pagina e un key che sara l'id univoco di ogni alunno) 
          alunni.map(a => (
            <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
          ))
        :

        //fino a quando non sara pronta la pagina farro vedere il seguente div 
        <div>Loading...</div>
      }
    </div>
  );
}

export default App;
