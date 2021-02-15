import { Link, useHistory } from 'react-router-dom';

export default function PasswordResetConfirmation() {
  const history = useHistory();
  return (
    <div className="form">
      <div className="header">
        <h1>Courriel envoyé.</h1>
        <p>
          Un courriel a été envoyé ou sera envoyé sous peu. Il contient un lien
          de réinitialisation de ton mot de passe.
        </p>
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
