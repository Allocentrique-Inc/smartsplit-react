import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SmartSplit from '../../../icons/smartsplit';
import postUser from '../../../api/users/postUser';

export default (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirm = async () => {
    const result = await postUser({ email, password });
    history.push('/');
  };
  return (
    <div className="form">
      <h1>En route vers la professionnalisation</h1>
      <p>Entre tes informations ci-dessous.</p>
      <div>
        <b>Mon courriel</b>
        <input value={email} onChange={handleEmail} />
      </div>
      <div>
        <b>Mon mot de passe</b>
        <input value={password} onChange={handlePassword} />
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
        <button onClick={handleConfirm}>Créer mon compte</button>
      </div>
    </div>
  );
};
