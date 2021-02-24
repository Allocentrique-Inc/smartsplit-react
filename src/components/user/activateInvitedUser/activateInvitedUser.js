import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import activateInvited from '../../../api/users/activateInvited';

export default (props) => {
  const { token, firstName: _firstName, lastName: _lastName } = useParams();
  const [firstName, setFirstName] = useState(_firstName);
  const [lastName, setLastName] = useState(_lastName);
  const [artistName, setArtistName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleArtistName = (e) => setArtistName(e.target.value);
  const handleSubmit = async () => {
    const result = await activateInvited({
      token,
      password,
      firstName,
      lastName,
      artistName,
    });
    setShowModal(true);
    setFirstName('');
    setLastName('');
    setArtistName('');
    setPassword('');
    setConfirmPassword('');
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
      <div className="toDo">Creation de compte avec réseau sociaux</div>
      <div className="formInput">
        <label htmlFor="firstName">Entre ton prénom</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstName}
        />
      </div>
      <div className="formInput">
        <label htmlFor="lastName">Entre ton nom de famille</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastName}
        />
      </div>
      <div className="formInput">
        <label htmlFor="artistName">Entre ton nom d'artiste (optionel)</label>
        <input
          type="text"
          id="artistName"
          value={artistName}
          onChange={handleArtistName}
        />
      </div>
      <div className="formInput">
        <label htmlFor="password">Choisis ton mot de passe</label>
        <div className="doubleInput">
          {/* <input id="password" value={password} onChange={handlePassword} /> */}
          {/* <div className="toDo">Validation de mot de passe</div>
          <input
            id="confirmPassword"
            value={password}
            onChange={handlePassword}
          /> */}
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <div className="toDo">Validation de mot de passe</div>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="buttons">
        <button onClick={handleSubmit} className="btn-primary">
          Confirmer mon compte
        </button>
      </div>
    </div>
  );
};
