import { useState } from 'react';
import postWorkpiece from '../../../../api/workpieces/postWorkpiece';
import X from '../../../../icons/x';

export default function WorkpieceModal({ setShowModal, resetData, create }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState({
    primary: '',
    secondary: '',
  });
  const [file, setFile] = useState('');
  const handleConfirm = async () => {
    await postWorkpiece({
      title,
    });
    setShowModal(false);
    resetData();
  };

  return (
    <div className="workpieceModal">
      <div className="modalBackground" onClick={() => setShowModal(false)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>{`${create ? 'Créer' : 'Modifier'} une pièce musicale`}</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <div className="formInput">
              <label htmlFor="workpieceTitle">Titre de la pièce musicale</label>
              <input type="text" id="workpieceTitle" />
              <div className="hint">
                Ne pas inclure de «featuring« dans le titre.
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="type">Cette oeuvre est...</label>
              <div className="radioGroup" id="type">
                <label>
                  <input
                    type="radio"
                    value="original"
                    checked={type.secondary === 'original'}
                    onChange={() => {
                      setType(() => ({ ...type, secondary: 'original' }));
                    }}
                  />
                  une création originale
                </label>
                <label>
                  <input
                    type="radio"
                    value="cover"
                    checked={type.secondary === 'cover'}
                    onChange={() => {
                      setType(() => ({ ...type, secondary: 'cover' }));
                    }}
                  />
                  une reprise (cover)
                </label>
                <label>
                  <input
                    type="radio"
                    value="remix"
                    checked={type.secondary === 'remix'}
                    onChange={() => {
                      setType(() => ({ ...type, secondary: 'remix' }));
                    }}
                  />
                  un remix
                </label>
              </div>
            </div>
            <div className="formInput toDo">
              <label>Artiste ou groupe originel</label>
              <input type="text" />
            </div>
            <div className="row">
              <div className="formInput">
                <label>
                  Fichier
                  <span style={{ color: '#687A8B', fontWeight: 'normal' }}>
                    {' '}
                    Optionnel
                  </span>
                </label>
                <input
                  type="file"
                  className="btn-primary filePicker"
                  value={file}
                  onChange={(e) => setFile(e.target.value)}
                />
                <div className="hint">
                  Format WAV ou MP3 seulement. 100 Mo maximum.
                </div>
              </div>
              <div className="formInput toDo">
                <label>Version de travail</label>
                <input type="number" />
              </div>
            </div>
            <div className="formInput toDo">
              <label>Artiste ou groupe originel</label>
              <input
                type="text"
                placeholder="Ajouter un ou plusieurs collaborateurs..."
              />
              <div className="hint">
                Ces collaborateurs seront automatiquement ajoutés au partage de
                droit. Vous pourrez toujours les retirer du partage
              </div>
            </div>
            <div className="formInput toDo">
              <label>Cette pièce musicale sort elle avec un label?</label>
              <input
                type="text"
                placeholder="Rechercher ou ajouter un label..."
              />
              <div className="hint">
                Ces collaborateurs seront automatiquement ajoutés au partage de
                droit. Vous pourrez toujours les retirer du partage
              </div>
            </div>
          </div>
          <div className="downBar">
            <button
              className="btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Annuler
            </button>
            <button className="btn-primary">
              {create ? "C'est parti !" : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
