import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import login from '../../../api/auth/login';
import SmartSplit from '../../../icons/smartsplit';
import Checkbox from '../../_/form/checkbox/checkbox';

const Login = ({ translations, language }) => {
  const [email, setEmail] = useState('simonboisclair553@hotmail.com');
  const [password, setPassword] = useState('ici12laba42');
  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const [stayConnected, setStayConnected] = useState(false);
  const handleConfirm = async () => {
    await login({ email, password });
    history.push('/');
  };
  return (
    <div className="form">
      <div className="header">
        <h1>{translations.h1._login[language]}</h1>
        <p>{translations.p._login[language]}</p>
      </div>

      <div className="formInput">
        <label htmlFor="email">
          {translations.fields.login.email._label[language]}
        </label>
        <input
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder={translations.fields.login.email._placeholder[language]}
        />
      </div>
      <div className="formInput">
        <label htmlFor="password">
          {translations.fields.login.password._label[language]}
        </label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={handlePassword}
        />
        <Link to="/user/request-password-reset">
          {translations.fields.login.password._hint[language]}
        </Link>
      </div>

      <div className="buttons">
        <div className="checkbox">
          <input
            type="checkbox"
            id="stayConnected"
            name="stayConnected"
            value="true"
          />
          <Checkbox
            checked={stayConnected}
            onChange={() => setStayConnected(!stayConnected)}
            label={translations.checkboxes._stayConnected[language]}
          />
        </div>
        <button onClick={handleConfirm} className="btn-primary">
          {translations.actionButton._login[language]}
        </button>
      </div>
    </div>
  );
};

export default Login;
