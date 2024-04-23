import { useState } from "react";

export default function Alunno({ alunno, popolaAlunni }) {
  const [inCancellazione, setInCancellazione] = useState(false);
  const [richiestaConferma, setRichiestaConferma] = useState(false);

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

  return (
    <tr>
      <td>{alunno.nome}</td>
      <td>{alunno.cognome}</td>

      <td>
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
