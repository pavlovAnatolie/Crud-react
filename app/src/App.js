import './App.css';
import Alunno from './Alunno'; 
import Form from './Form';
import {useState, useEffect} from 'react';


function App() {

  useEffect(() => {
    popolaAlunni();
  },[])

  const [alunni,setAlunni] = useState([]);
  const [pronto,setPronto] = useState(false);
  const [insertForm,setInsertForm] = useState(false);
  const [alunno,setAlunno] = useState(null);


  async function popolaAlunni(){
    const response = await fetch("http://localhost:8080/alunni",{method: "GET"});
    const array = await response.json();
    setAlunni(array);
    setPronto(true);
  }

  //funzione che vale sia per il form di iserimento che per il form di aggiornamento
  function noUpdate(){
    setInsertForm(false);
    setAlunno(null);
  }

  return(
    <div className='App'>
      {
        pronto ?
        <table>
          <tr><th>Nome</th><th>Cognome</th></tr>
          { alunni.map((a) => (
            //alunno={a}-interagire con l'alunno popolaAlunni={popolaAlunni}-ridisegnare la pagina setAlunno={setAlunno}-per edit 2 setInsertForm={setInsertForm}-per edit 2 key={a.id}
            <Alunno alunno={a} popolaAlunni={popolaAlunni} setAlunno={setAlunno} setInsertForm={setInsertForm} key={a.id} />
          ))
          } 
        </table>
        :
        <div>Loading...</div>
      }

      {
        insertForm ?
          <div>
            <Form popolaAlunni={popolaAlunni} alunno={alunno} setAlunno={setAlunno} />
            <button onClick={noUpdate} >cancel</button>
          </div>
        :
        <>
          <button onClick={() => setInsertForm(true)}>Inserisci un nuovo alunno</button>
          </>
      }


    </div>
  );
}

export default App;
