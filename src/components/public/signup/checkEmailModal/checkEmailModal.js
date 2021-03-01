import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import postWorkpiece from '../../../../api/workpieces/postWorkpiece';
import X from '../../../../icons/x';
import HighFive from '../../../../icons/high-five';

export default function CheckEmailModal({
  setShowModal,
  translations,
  language,
}) {
  const t_title = translations.publicPages.checkEmailModal._title[language];
  const t_content = translations.publicPages.checkEmailModal._content[language];
  const t_button = translations.publicPages.checkEmailModal._button[language];

  return (
    <div className="modalBackground" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkEmailModal">
          <div className="topBar">
            <h4>{t_title}</h4>
            <button className="btn-icon" onClick={() => setShowModal(false)}>
              <X />
            </button>
          </div>
          <div className="content">
            <div className="iconContainer">
              <HighFive />
            </div>
            <p className="medium-400">{ReactHtmlParser(t_content)}</p>
          </div>
          <div className="downBar">
            <button className="btn-primary" onClick={() => setShowModal(false)}>
              {t_button}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
