import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import deleteUser from '../../../../../../api/users/deleteUser';
import X from '../../../../../../icons/x';

export default function DeleteAccountModal(props) {
  const { setShowModal } = props;
  const history = useHistory();
  const [security, setSecurity] = useState('');
  const isSecurityValid = () => security === 'détruire';
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
            <h4>Détruire ce compte</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <p>Afin de détruire ce compte, tu dois confirmer ton intention.</p>
          <div className="content">
            <h3>Attention cette opération est irréversible.</h3>
            <div className="formInput">
              <label forHtml="input">
                Écris le mot « détruire » ci-dessous, afin de confirmer ton
                intention :
              </label>
              <input
                type="text"
                id="input"
                value={security}
                onChange={(e) => setSecurity(e.target.value)}
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
              className={`btn-primary-alert ${
                !isSecurityValid() && 'btn-disabled'
              }`}
              onClick={handleOnDelete}
              disabled={!isSecurityValid()}
            >
              Détruire le compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
