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

  return(
    <div className='App'>
      {
        pronto ?
        <table>
          <tr><th>Nome</th><th>Cognome</th></tr>
          { alunni.map((a) => (
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
            <button onClick={() => setInsertForm(false)}>cancel</button>
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
