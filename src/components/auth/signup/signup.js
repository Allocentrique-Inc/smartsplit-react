import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SmartSplit from '../../../icons/smartsplit';
import postUser from '../../../api/users/postUser';
import CheckEmailModal from './checkEmailModal/checkEmailModal';

export default (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [artistName, setArtisteName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleArtistName = (e) => setArtisteName(e.target.value);
  const handleSubmit = async () => {
    const result = await postUser({
      email,
      password,
      firstName,
      lastName,
      artistName,
    });
    setShowModal(true);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const isPasswordValid = () => password === confirmPassword && password !== '';
  return (
    <div className="form">
      {showModal && <CheckEmailModal setShowModal={setShowModal} />}
      <div className="header">
        <h1>En route vers la professionnalisation</h1>
        <p>
          Tu es à un clic de pouvoir documenter ta musique et de partager tes
          droits avec tes contributeurs.
        </p>
      </div>
      {/* <div className="toDo">Creation de compte avec réseau sociaux</div> */}
      <div className="form-input">
        <label htmlFor="text">Entre ton prénom</label>
        <input id="firstName" value={firstName} onChange={handleFirstName} />
      </div>
      <div className="form-input">
        <label htmlFor="text">Entre ton nom de famille</label>
        <input id="lastName" value={lastName} onChange={handleLastName} />
      </div>
      <div className="form-input">
        <label htmlFor="text">Entre ton nom d'artiste (optionel)</label>
        <input id="artistName" value={artistName} onChange={handleArtistName} />
      </div>
      <div className="form-input">
        <label htmlFor="email">Entre ton courriel</label>
        <input id="email" value={email} onChange={handleEmail} />
      </div>
      <div className="form-input">
        <label htmlFor="password">Choisis ton mot de passe</label>
        <div className="double-input">
          <input id="password" value={password} onChange={handlePassword} />
          {/* <div className="toDo">Validation de mot de passe</div>
          <input
            id="confirmPassword"
            value={password}
            onChange={handlePassword}
          /> */}
        </div>
      </div>
      <div className="buttons">
        {/* <div className="checkbox">
          <input
            type="checkbox"
            id="stayLoggedIn"
            name="stayLoggedIn"
            value="true"
          />
          <label htmlFor="stayLoggedIn">Rester connecté</label>
        </div> */}
        <button onClick={handleSubmit} className="btn-primary">
          Créer mon compte
        </button>
      </div>
    </div>
  );
};
