import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function PasswordResetConfirmation({ translations, language }) {
  const history = useHistory();
  const t_h1 = translations.publicPages.h1._passwordResetConfirmation[language];
  const t_p = translations.publicPages.p._passwordResetConfirmation[language];
  const t_button =
    translations.publicPages.button._passwordResetConfirmation[language];

  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);
  return (
    <div className="content">
      <div className="header">
        <h1>{t_h1}</h1>
        <p>{t_p}</p>
      </div>
      <div className="buttons">
        <button
          className="btn-secondary "
          style={{ marginTop: 32, width: '100%' }}
          onClick={() => history.push('/')}
        >
          {t_button}
        </button>
      </div>
    </div>
  );
}
