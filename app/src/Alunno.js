import { useState } from "react";

export default function Alunno({ alunno, popolaAlunni }) {
  const [inCancellazione, setInCancellazione] = useState(false);
  const [richiestaConferma, setRichiestaConferma] = useState(false);
  const [editing, setEditing] = useState(false);
  const [nome, setNome] = useState(alunno.nome);
  const [cognome, setCognome] = useState(alunno.cognome);

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
    await fetch(`http://localhost:8080/alunni/${alunno.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nome, cognome: cognome }),
    });

    popolaAlunni();
  }

  function changeNome(event) {
    setNome(event.target.value);
  }

  function changeCognome(event) {
    setCognome(event.target.value);
  }

  function annullaEditing() {
    setEditing(false);
  }

  return (
    <tr>
      {/* edit inline */}
      <td>
        {editing ? (
          <input type="text" onChange={changeNome} value={nome} />
        ) : (
          alunno.nome
        )}
      </td>

      <td>
        {editing ? (
          <input type="text" onChange={changeCognome} value={cognome} />
        ) : (
          alunno.cognome
        )}
      </td>

      <td>
        {editing ? (
          //tag unico
          <span>
            <button onClick={fineEditing}>Salva</button>
            <button onClick={annullaEditing}>cancel</button>
          </span>
        ) : (
          //tag unico
          <>
            <button onClick={avviaEditing}>Edit</button>
            {/*cancellazione*/}
            {richiestaConferma ? (
              //tag unico
              <span>
                {" "}
                Sei Sicuro?
                <button onClick={cancellaAlunno}>si</button>
                <button onClick={annullaRichiesta}>no</button>
              </span>
            ) : (
              <button onClick={richiesta}>elimina</button>
            )}
            {inCancellazione && <span>in fase di Cancellazione</span>}
          </>
        )}
      </td>
    </tr>
  );
}
