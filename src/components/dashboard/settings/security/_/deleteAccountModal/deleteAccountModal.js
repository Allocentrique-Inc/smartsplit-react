import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import deleteUser from '../../../../../../api/users/deleteUser';
import X from '../../../../../../icons/x';

export default function DeleteAccountModal({
  setShowModal,
  translations,
  language,
}) {
  const history = useHistory();
  const [security, setSecurity] = useState('');
  const isSecurityValid = () =>
    security ===
    translations.security.deleteAccountModal._securityWord[language];
  const handleOnDelete = async () => {
    const user_id = localStorage.getItem('user_id');
    const result = await deleteUser({ user_id });
    console.log('DELETE ACCOUNT', result);
    history.push('/auth/login');
  };
  return (
    <div className="deleteAccountModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>
              {translations.security.deleteAccountModal._action[language]}
            </h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <h3>{translations.security.deleteAccountModal._h3[language]}</h3>
            <p>{translations.security.deleteAccountModal._p1[language]}</p>
            <div className="formInput">
              <label htmlFor="input">
                {translations.security.deleteAccountModal._inputLabel[language]}
              </label>
              <input
                type="text"
                id="input"
                value={security}
                onChange={(e) => setSecurity(e.target.value)}
              />
            </div>
            <p>{translations.security.deleteAccountModal._p2[language]}</p>
          </div>
          <div className="downBar">
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              {translations.security.deleteAccountModal._cancel[language]}
            </button>
            <button
              className={`btn-primary-alert ${
                !isSecurityValid() && 'btn-disabled'
              }`}
              onClick={handleOnDelete}
              disabled={!isSecurityValid()}
            >
              {
                translations.security.deleteAccountModal._deleteAccount[
                  language
                ]
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
