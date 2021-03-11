import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Onboarding({ translations, language }) {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [artistName, setArtistName] = useState('');
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleArtistName = (e) => setArtistName(e.target.value);
  const handleSubmit = () => {
    setFirstName('');
    setLastName('');
    setArtistName('');
  };

  useEffect(() => {
    localStorage.removeItem('accessToken');
  }, []);

  return (
    <div className="content">
      <div className="header">
        <h1>Courriel envoyé.</h1>
        <p>
          Un courriel a été envoyé ou sera envoyé sous peu. Il contient un lien
          de réinitialisation de ton mot de passe.
        </p>
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
      </div>
      <button
        className="btn-secondary"
        style={{ marginTop: 32, width: '100%' }}
        onClick={() => history.push('/')}
      >
        Retourner à la page d'accueil
      </button>
    </div>
  );
}
