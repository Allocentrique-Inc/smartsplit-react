import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SmartSplit from '../../../icons/smartsplit';
import postUser from '../../../api/users/postUser';

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleSubmit = async () => {
    const result = await postUser({ email, password });
    history.push('/');
  };

  const isPasswordValid = () => password === confirmPassword && password !== '';
  return (
    <div className="form">
      <div className="header">
        <h1>En route vers la professionnalisation</h1>
        <p>
          Tu es à un clic de pouvoir documenter ta musique et de partager tes
          droits avec tes contributeurs.
        </p>
      </div>
      <div className="form-input">
        <label htmlFor="email">Mon courriel</label>
        <input id="email" value={email} onChange={handleEmail} />
      </div>
      <div className="form-input">
        <label htmlFor="password">Mon mot de passe</label>
        <input id="password" value={password} onChange={handlePassword} />
      </div>
      <div className="form-input">
        <label htmlFor="confirmPassword">Confirme ton mot de passe</label>
        <input
          id="confirmPassword"
          value={password}
          onChange={handlePassword}
        />
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
        <button onClick={handleSubmit}>Créer mon compte</button>
      </div>
    </div>
  );
};
