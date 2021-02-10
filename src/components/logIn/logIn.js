import { useState } from 'react';
import login from '../../api/auth/login';
import SmartSplit from '../../icons/smartsplit';

const Login = (props) => {
  const [email, setEmail] = useState('simonboisclair553@hotmail.com');
  const [password, setPassword] = useState('ici12laba42');
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirm = async () => {
    await login({ email, password });
    props.resetLogginCheck();
  };
  return (
    <div className="login">
      <div className="topBar">
        <SmartSplit />
        <div className="right">
          <button>Pas encore membre ?</button>
          <button>Créer mon compte</button>
          <button>English</button>
        </div>
      </div>
      <div className="form">
        <h1>Connecte-toi à ton compte SmartSplit.</h1>
        <p>Entre tes informations ci-dessous.</p>
        <div>
          <b>Mon courriel</b>
          <input value={email} onChange={handleEmail} />
        </div>
        <div>
          <b>Mon mot de passe</b>
          <input value={password} onChange={handlePassword} />
        </div>
        <div className="buttons">
          <div className="checkbox">
            <input
              type="checkbox"
              id="stayLoggedIn"
              name="stayLoggedIn"
              value="true"
            />
            <label htmlFor="stayLoggedIn">Rester connecté</label>
          </div>
          <button onClick={handleConfirm}>Me connecter</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
