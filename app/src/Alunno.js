import { useState } from "react";

export default function Alunno({ alunno, popolaAlunni }) {
  const [inCancellazione, setInCancellazione] = useState(false);
  const [richiestaConferma, setRichiestaConferma] = useState(false);
  const [Editing, setEditare] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");

  async function cancellaAlunno() {
    setRichiestaConferma(false);
    setInCancellazione(true);

    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "DELETE",
    });
    popolaAlunni();
  }

  function richiesta() {
    setRichiestaConferma(true);
  }

  function annullaRichiesta() {
    setRichiestaConferma(false);
  }

  function avviaEditing() {
    setEditing(true);
  }

   async function fineEditing() {
    setEditing(false);
     await fetch(`http://localhost:8080/alunni/${alunno.id}`, 
        {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nome: nome, cognome:cognome})
    });

     popolaAlunni();
  }

  function changeNome(event){
        setNome(event.target.value);
    }

    function changeCognome(event){
        setCognome(event.target.value);
    }

  return (
    <tr>
    
      <td>{Editing ? (
       <input type="text" name="nome" onChange={changeNome}/><br />
        </div>
        ) : (
          alunno.nome
        )}</td>
  
      <td>{Editing ? (
       <input type="text" name="nome" onChange={changeCognome}/><br />
        </div>
        ) : (
          alunno.cognome
        )}</td>

      <td>
    {Editing ? (
         <button onClick={fineEditing}>Salva</button>
        ) : (
          <button onClick={avviaEditing}>Edit</button>
        )}

    
        {richiestaConferma ? (
          <span>
            {" "}
            Sei Sicuro?
            <button onClick={cancellaAlunno}>si</button>
            <button onClick={annullaRichiesta}>no</button>
          </span>
        ) : (
          <button onClick={richiesta}>Cancella</button>
        )}
        {inCancellazione && <span>in fase di Cancellazione</span>}
      </td>
    </tr>
  );
}
