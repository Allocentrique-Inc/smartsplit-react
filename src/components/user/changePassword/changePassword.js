import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import changePassword from '../../../api/users/changePassword';

export default () => {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async () => {
    await changePassword({ token, password });
    history.push('/');
  };
  const isPasswordValid = () => password === confirmPassword && password !== '';

  return (
    <div className="form">
      <h1 className="header">Réinitialise ton mot de passe.</h1>
      <div className="form-input">
        <label htmlFor="password">Choisis ton nouveau mot de passe</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-input">
        <label htmlFor="confirmPassword">
          Confirme ton nouveau mot de passe
        </label>
        <input
          type="text"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="buttons">
        <div />
        <button onClick={handleSubmit} disabled={!isPasswordValid()}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
};
