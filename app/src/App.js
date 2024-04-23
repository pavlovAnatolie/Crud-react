import './App.css';
import Alunno from './Alunno'; 
import InsForm from './InsForm';
import {useState, useEffect} from 'react';


function App() {

  useEffect(() => {
    popolaAlunni();
  },[])

  const [alunni,setAlunni] = useState([]);
  const [pronto,setPronto] = useState(false);
  const [insertForm,setInsertForm] = useState(false);


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
            <Alunno alunno={a} popolaAlunni={popolaAlunni} key={a.id} />
          ))
          } 
        </table>
        :
        <div>Loading...</div>
      }
      {

        insertForm ?
          <div><InsForm popolaAlunni={popolaAlunni} />
            <button onClick={() => setInsertForm(false)}>cancel</button>
          </div>

        
        :
          <button onClick={() => setInsertForm(true)}>Inserisci un nuovo alunno</button>
      }


    </div>
  );
}

export default App;
