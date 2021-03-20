import { useState } from 'react';
import X from '../../../../icons/x';
import deleteWorkpiece from '../../../../api/workpieces/deleteWorkpiece';

const DeletingWorkpiece = (props) => {
  const [secret, setSecret] = useState('');
  const [triedSubmit, setTriedSubmit] = useState(false);
  const t_topBar = {
    fr: 'Supprimer une oeuvre',
    en: 'Delete a workpiece',
  }[props.language];
  const t_secretRequest = {
    fr:
      'Veuillez écrire le mot "DELETE" en majuscule et cliquez sur Confirmer.',
    en:
      'Please write the word "DELETE" with capital letters and click on Confirm',
  }[props.language];
  const t_cancel = {
    fr: 'Annuler',
    en: 'Cancel',
  }[props.language];
  const t_submit = {
    fr: 'Confirmer',
    en: 'Confirm',
  }[props.language];

  const handleSetSecret = (e) => setSecret(e.target.value);
  const closeModal = () => props.setWorkpieceInDeletion(null);
  const hasError = secret !== 'DELETE';
  const handleConfirm = async () => {
    setTriedSubmit(true);
    if (!hasError) {
      props.setIsLoaded(false);
      await deleteWorkpiece({ workpiece_id: props.workpieceInDeletion });
      await props.resetWorkpiecesByOwner();
      props.setWorkpieceInDeletion(null);
      props.setIsLoaded(true);
    }
  };
  // const t_topBar = ""
  return (
    <div className="workpieceModal">
      <div className="modalBackground" onClick={closeModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>{t_topBar}</h4>
            <button className="btn-icon" onClick={closeModal}>
              <X />
            </button>
          </div>
          <div className="content">
            <div className="formInput">
              <label htmlFor="workpieceTitle">{t_secretRequest}</label>
              <input
                type="text"
                id="workpieceTitle"
                value={secret}
                onChange={handleSetSecret}
                style={{
                  boxShadow:
                    triedSubmit && hasError ? '0px 0px 1px 1px red' : null,
                }}
              />
            </div>
          </div>
          <div className="downBar">
            <button className="btn-secondary" onClick={closeModal}>
              {t_cancel}
            </button>
            <button onClick={handleConfirm} className="btn-primary">
              {t_submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletingWorkpiece;
