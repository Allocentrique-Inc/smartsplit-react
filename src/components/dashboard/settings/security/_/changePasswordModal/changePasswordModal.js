import { useState } from 'react';
import { Link } from 'react-router-dom';
import X from '../../../../../../icons/x';
import changePassword from '../../../../../../api/users/changePassword';

export default function ChangePasswordModal({
  setShowModal,
  translations,
  language,
}) {
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
    <div className="changePasswordModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>
              {translations.security.changePasswordModal._title[language]}
            </h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <div className="formInput">
              <label htmlFor="currentPassword">
                {
                  translations.security.changePasswordModal._currentPassword[
                    language
                  ]
                }
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Link to="/user/request-password-reset">
                {
                  translations.security.changePasswordModal._resetPassword[
                    language
                  ]
                }
              </Link>
            </div>
            <div className="formInput">
              <label htmlFor="password">
                {translations.security.changePasswordModal._password[language]}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="formInput">
              <label htmlFor="confirmPassword">
                {
                  translations.security.changePasswordModal._confirmPassword[
                    language
                  ]
                }
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
              {translations.security.changePasswordModal._cancel[language]}
            </button>
            <button
              className={`btn-primary ${!isPasswordValid() && 'btn-disabled'}`}
              onClick={handleSubmit}
              disabled={!isPasswordValid()}
            >
              {translations.security.changePasswordModal._save[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
