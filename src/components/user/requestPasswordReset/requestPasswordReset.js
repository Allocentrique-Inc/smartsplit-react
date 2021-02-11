import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import requestPasswordReset from '../../../api/users/requestPasswordReset';

export default () => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const handleSubmit = async () => {
    await requestPasswordReset({ email });
    history.push('/');
  };
  return (
    <div className="form">
      <div className="header">
        <h1>Réinitialise ton mot de passe.</h1>
        <p>
          Saisis l'adresse courriel liée à ton compte pour obtenir le lien de
          réinitialisation.
        </p>
      </div>
      <div className="form-input">
        <label htmlFor="email">Courriel</label>
        <input
          type="text"
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="buttons">
        <Link to="/auth/signup">Je n'ai pas de compte</Link>
        <button onClick={handleSubmit} className="btn-primary">
          Envoyer
        </button>
      </div>
    </div>
  );
};
