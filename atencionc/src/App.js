import './App.css';
import React, {useState} from 'react'
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Gestores from './components/pages/Gestores'
import Buscar from './components/pages/Buscar';
import Seguimiento from './components/pages/Seguimiento';
import Graficas from './components/pages/Graficas';
import Reportes from './components/pages/Reportes';
import Pendientes from './components/pages/Pendientes';
import LoginForm from './components/Login/LoginForm';
/*import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles((them)=>({
  modal:{
    position: 'absolute',
    width:400,
    backgroundColor:'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}))*/

function App() {
  const adminUser ={

    name: "admin",
    password: "admin123"
  }

  const [user, setUser] = useState({name:""});
  const [error] = useState("");

  const Login = details => {
      console.log(details);

      if(details.password === adminUser.password){
      console.log("Logged in");

      setUser({
        name:details.name
      });

      }else{
        console.log("Los datos no coinciden");
        <div className="error">
        setError("Usuario no reconocido");
        </div>
      }
  }

  /*const Logout = () => {
    setUser({name:""});
  }*/

  return (
    <>
      <div className='App'>
          {(user.name !== "") ? (
                <Router>
                  <Navbar/>
                    <Routes>
                      <Route path='/buscar' element={<Buscar/>}/>
                      <Route path='/seguimiento' element={<Seguimiento/>}/>
                      <Route path='/graficas' element={<Graficas/>}/>
                      <Route path='/reportes' element={<Reportes/>}/>
                      <Route path='/' exact element={<Pendientes/>}/>
                      <Route path='/gestores' element={<Gestores/>}/>
                    </Routes>   
                   {/*<button onClick={Logout}>Logout</button>*/}
                </Router>
          ) : (
            <LoginForm Login={Login} error={error}/>
        )}
      </div>


    </>
  );
}

export default App;
