import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import login from '../../../api/auth/login';
import SmartSplit from '../../../icons/smartsplit';

const Login = (props) => {
  const [email, setEmail] = useState('simonboisclair553@hotmail.com');
  const [password, setPassword] = useState('ici12laba42');
  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirm = async () => {
    await login({ email, password });
    history.push('/');
  };
  return (
    <div className="form">
      <div className="header">
        <h1>Connecte-toi à ton compte SmartSplit.</h1>
        <p>Entre tes informations ci-dessous.</p>
      </div>

      <div className="form-input">
        <label htmlFor="email">Mon courriel</label>
        <input id="email" value={email} onChange={handleEmail} />
      </div>
      <div className="form-input">
        <label htmlFor="password">Mon mot de passe</label>
        <input id="password" value={password} onChange={handlePassword} />
        <Link to="/user/request-password-reset">Mot de passe oublié?</Link>
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
        <button onClick={handleConfirm} className="btn-primary">
          Me connecter
        </button>
      </div>
    </div>
  );
};

export default Login;
