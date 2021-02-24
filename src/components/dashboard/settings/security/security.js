import { useState } from 'react';
import ChangePasswordModal from './_/changePasswordModal/changePasswordModal';
import DeleteAccountModal from './_/deleteAccountModal/deleteAccountModal';

export default function Security(props) {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDelAccountModal, setShowDelAccountModal] = useState(false);

  return (
    <div className="security" id="security">
      {showPasswordModal && (
        <ChangePasswordModal setShowModal={setShowPasswordModal} {...props} />
      )}
      {showDelAccountModal && (
        <DeleteAccountModal setShowModal={setShowDelAccountModal} {...props} />
      )}

      <h2>Sécurité</h2>
      <div className="formInput">
        {' '}
        <label htmlFor="changePasswordBtn">Mot de passe</label>
        <button
          id="changePasswordBtn"
          className="btn-secondary"
          onClick={() => setShowPasswordModal(true)}
        >
          Changer le mot de passe
        </button>
      </div>
      <div className="formInput">
        <label htmlFor="deleteAccountBtn">Résiliation</label>
        <button
          id="deleteAccountBtn"
          className="btn-secondary-alert"
          onClick={() => setShowDelAccountModal(true)}
        >
          Détruire ce compte
        </button>
      </div>
    </div>
  );
}
