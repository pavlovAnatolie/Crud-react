import { useState } from "react";

export default function InsForm({popolaAlunni}) {
  const [nome,setNome] = useState("");
  const [cognome,setCognome] = useState("");
    async function insert(){
        await fetch(`http://localhost:8080/alunni`, 
        {
        method: "POST",
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
    <div>
        <h1>Form di Inserimento</h1>
        Nome:<input type="text" name="nome" onChange={changeNome}/><br />
        Cognome:<input type="cognome" name="cognome" onChange={changeCognome}/><br />
        <button onClick={insert}>Salva</button>

        </div>
  );
}
