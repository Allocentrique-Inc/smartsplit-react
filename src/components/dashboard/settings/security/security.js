import { useState } from 'react';
import ChangePasswordModal from './_/changePasswordModal/changePasswordModal';
import DeleteAccountModal from './_/deleteAccountModal/deleteAccountModal';

export default function Security(props) {
  const { translations, language } = props;
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

      <h2>{translations.titles._security[language]}</h2>
      <div className="formInput">
        {' '}
        <label htmlFor="changePasswordBtn">
          {translations.security.changePasswordModal._label[language]}
        </label>
        <button
          id="changePasswordBtn"
          className="btn-secondary"
          onClick={() => setShowPasswordModal(true)}
        >
          {translations.security.changePasswordModal._action[language]}
        </button>
      </div>
      <div className="formInput">
        <label htmlFor="deleteAccountBtn">
          {translations.security.deleteAccountModal._label[language]}
        </label>
        <button
          id="deleteAccountBtn"
          className="btn-secondary-alert"
          onClick={() => setShowDelAccountModal(true)}
        >
          {translations.security.deleteAccountModal._action[language]}
        </button>
      </div>
    </div>
  );
}
