import { useState } from 'react';
import { Link } from 'react-router-dom';
import X from '../../../../../../icons/x';
import changePassword from '../../../../../../api/users/changePassword';

export default function ChangePasswordModal({ setShowModal }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = async () => {
    const result = await changePassword({ currentPassword, password });
    console.log('CHANGE PASSWORD', result);
    setShowModal(false);
  };
  const isPasswordValid = () => password === confirmPassword && password !== '';

  return (
    <div className="addProIdModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>Changer le mot de passe</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <div className="formInput">
              <label htmlFor="currentPassword">Mot de passe actuel</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Link to="/user/request-password-reset">
                Mot de passe oublié?
              </Link>
            </div>
            <div className="formInput">
              <label htmlFor="password">Nouveau mot de passe</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label htmlFor="confirmPassword">
                Répète ton nouveau mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="downBar">
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button
              className={`btn-primary ${!isPasswordValid() && 'btn-disabled'}`}
              onClick={handleSubmit}
              disabled={!isPasswordValid()}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
