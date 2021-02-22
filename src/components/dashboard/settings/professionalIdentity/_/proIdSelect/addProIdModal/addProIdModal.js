import { useState } from 'react';
import X from '../../../../../../../icons/x';

export default function AddProIdModal({ setShowModal, onAdd }) {
  const [selection, setSelection] = useState('');
  const handleOnAdd = () => {
    onAdd(selection);
    setShowModal(false);
  };
  return (
    <div className="addProIdModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>Ajouter un numéro d'identifiant</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <p>Description</p>
            <div className="formInput">
              <label htmlFor="selection">Société de gestion</label>
              <input
                type="text"
                id="selection"
                value={selection}
                onChange={(e) => setSelection(e.target.value)}
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
            <button onClick={handleOnAdd} className="btn-primary">
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
