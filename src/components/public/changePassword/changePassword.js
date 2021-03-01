import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import changePassword from '../../../api/users/changePassword';

export default ({ translations, language }) => {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async () => {
    const result = await changePassword({ token, password });
    console.log('CHANGE PASSWORD', result);
    history.push('/');
  };
  const isPasswordValid = () => password === confirmPassword && password !== '';

  const t_h1 = translations.publicPages.h1._changePassword[language];
  const t_button = translations.publicPages.button._changePassword[language];

  const t_password_label =
    translations.publicPages.form.changePassword.password._label[language];
  const t_password_placeholder =
    translations.publicPages.form.changePassword.password._placeholder[
      language
    ];
  const t_confirm_password_label =
    translations.publicPages.form.changePassword.confirmPassword._label[
      language
    ];

  return (
    <div className="content">
      <h1 className="header">{t_h1}</h1>
      <div className="formInput">
        <label htmlFor="password">{t_password_label}</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="toDo">Validation de mot de passe</div>
      </div>
      <div className="formInput">
        <label htmlFor="confirmPassword">{t_confirm_password_label}</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="buttons">
        <div />
        <button
          className={`btn-primary ${!isPasswordValid() && 'btn-disabled'}`}
          onClick={handleSubmit}
          disabled={!isPasswordValid()}
        >
          {t_button}
        </button>
      </div>
    </div>
  );
};
