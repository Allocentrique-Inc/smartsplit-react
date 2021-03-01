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
  const t_h1 = translations.publicPages.h1._login[language];
  const t_p = translations.publicPages.p._login[language];
  const t_email_label =
    translations.publicPages.form.login.email._label[language];
  const t_email_placeholder =
    translations.publicPages.form.login.email._placeholder[language];
  const t_password_label =
    translations.publicPages.form.login.password._label[language];
  const t_forgot_password_link =
    translations.publicPages.form.login.password._hint[language];
  const t_checkbox =
    translations.publicPages.checkboxes._stayConnected[language];
  const t_button = translations.publicPages.button._login[language];

  return (
    <div className="form">
      <div className="header">
        <h1>{t_h1}</h1>
        <p>{t_p}</p>
      </div>

      <div className="formInput">
        <label htmlFor="email">{t_email_label}</label>
        <input
          id="email"
          value={email}
          onChange={handleEmail}
          placeholder={t_email_placeholder}
        />
      </div>
      <div className="formInput">
        <label htmlFor="password">{t_password_label}</label>
        <input
          id="password"
          value={password}
          type="password"
          onChange={handlePassword}
        />
        <Link to="/user/request-password-reset">{t_forgot_password_link}</Link>
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
            label={t_checkbox}
          />
        </div>
        <button onClick={handleConfirm} className="btn-primary">
          {t_button}
        </button>
      </div>
    </div>
  );
};

export default Login;
