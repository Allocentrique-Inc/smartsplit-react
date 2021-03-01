import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import requestPasswordReset from '../../../api/users/requestPasswordReset';

export default ({ translations, language }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const handleSubmit = async () => {
    await requestPasswordReset({ email });
    history.push('/user/password-reset-confirmation');
  };
  const t_h1 = translations.publicPages.h1._requestPasswordReset[language];
  const t_p = translations.publicPages.p._requestPasswordReset[language];
  const t_link = translations.publicPages._signupLink[language];
  const t_button =
    translations.publicPages.button._requestPasswordReset[language];
  const t_email_label =
    translations.publicPages.form.requestPasswordReset.email._label[language];
  return (
    <div className="content">
      <div className="header">
        <h1>{t_h1}</h1>
        <p>{t_p}</p>
      </div>
      <div className="formInput">
        <label htmlFor="email">{t_email_label}</label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="buttons">
        <Link to="/auth/signup">{t_link}</Link>
        <button onClick={handleSubmit} className="btn-primary">
          {t_button}
        </button>
      </div>
    </div>
  );
};
