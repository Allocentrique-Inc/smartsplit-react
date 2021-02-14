import { useState } from 'react';
import postWorkpiece from '../../../../api/workpieces/postWorkpiece';
import X from '../../../../icons/x';
import HighFive from '../../../../icons/high-five';

export default function CheckEmailModal({ setShowModal }) {
  return (
    <div className="modalBackground" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkEmailModal">
          <div className="topBar">
            <h4>Vérifie tes courriels</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <div className="iconContainer">
              <HighFive />
            </div>
            <p className="medium-400">
              Un message incluant un lien de validation de ton compte t’a été
              envoyé par courriel. Vérifie tes spams. On ne sait jamais !
            </p>
          </div>
          <div className="downBar">
            <button className="btn-primary" onClick={() => setShowModal(false)}>
              J'ai compris
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
