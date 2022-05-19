import React, {useState} from 'react';
import logo from '../../images/logo.png'
import '../Login/LoginForm.css'

function LoginForm({Login,error}) {
    const [details, setDetails] = useState({name:"",password:""});

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

  return (
    <form onSubmit={submitHandler}>
        <div className='log'>
         <div className="form-inner">
            <img className="login" src={logo} alt="logo"/>
                
                {(error !== "") ? (<div className="error">{error}</div>) :""}
                <div className="form-group">
                    <label htmlFor="name">Usuario:</label>
                    <input type="name" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>

                <input type="submit" value="INICIAR SESIÓN"/>
            </div>
        </div>

    </form>
  )
}

export default LoginForm;
