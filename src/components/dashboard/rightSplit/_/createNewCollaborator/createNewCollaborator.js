import { useState } from 'react';
import postCollaborator from '../../../../../api/users/postCollaborator';

const CreateNewCollaborator = (props) => {
  const user_id = localStorage.getItem('user_id');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const cancel = () => props.setIsCreatingNewCollaborator(false);
  return (
    <div className="modalBackground" onClick={cancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="topBar">
          <div className="title">Ajouter un collaborateur</div>
          <button className="exit" onClick={cancel}>
            x
          </button>
        </div>
        <>
          <div className="createNewCollaborator">
            <div className="row1">
              <div>
                <div className="label">First Name</div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <div className="label">Last Name</div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="label">Email</div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="downBar createNewCollaboratorNavigation">
            <div>
              <button className="cancel" onClick={cancel}>
                Annuler
              </button>
              <button
                className="save"
                onClick={async () => {
                  await postCollaborator({
                    firstName,
                    lastName,
                    email,
                    user_id,
                  });
                  await props.resetData();
                  cancel();
                }}
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default CreateNewCollaborator;
