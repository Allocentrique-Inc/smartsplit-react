import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import changePassword from '../../../api/users/changePassword';

export default () => {
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

  return (
    <div className="form">
      <h1 className="header">Réinitialise ton mot de passe.</h1>
      <div className="formInput">
        <label htmlFor="password">Choisis ton nouveau mot de passe</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="toDo">Validation de mot de passe</div>
      </div>
      <div className="formInput">
        <label htmlFor="confirmPassword">
          Confirme ton nouveau mot de passe
        </label>
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
          Réinitialiser
        </button>
      </div>
    </div>
  );
};
