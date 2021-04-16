import { useEffect, useState } from 'react';

import getWorkpiecesByOwner from '../../../api/workpieces/getWorkpiecesByOwner';
import getWorkpiecesByRightHolder from '../../../api/workpieces/getWorkpiecesByRightHolder';

import Workpiece from './workpiece/workpiece';
import LeftMenu from './leftMenu/leftMenu';
import SelectPerspective from './selectPerspective/selectPerspective';
import AddOrEditWorkpieceModal from '../_/addOrEditWorkpieceModal/addOrEditWorkpieceModal';
import ProfileOptions from '../_/profileOptions/profileOptions';
import EmptyOwnerSongs from './emptyOwnerSongs/emptyOwnerSongs';
import EmptyRightholderSongs from './emptyRightholderSongs/emptyRightholderSongs';
import DeletingWorkpiece from './deletingWorkpiece/deletingWorkpiece';
import MobileDownBar from '../_/mobileDownBar/mobileDownBar';

const Workpieces = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [workpieceInDeletion, setWorkpieceInDeletion] = useState(null);

  const t_pageTitle = {
    fr: 'Mes pièces musicales',
    en: 'My Workpieces',
  }[props.language];
  const t_addButton = {
    fr: 'Ajouter',
    en: 'Add',
  }[props.language];

  const commonProps = {
    ...props,
    setShowModal,
    setWorkpieceInDeletion,
    workpieceInDeletion,
  };

  return (
    <div className="workpieces">
      {showModal && <AddOrEditWorkpieceModal {...commonProps} />}
      {workpieceInDeletion && <DeletingWorkpiece {...commonProps} />}
      <LeftMenu {...commonProps} />
      <div className="rightContent">
        {!props.isMobile && (
          <div className="topBar">
            {/* <div className="searchBar" /> */}
            <ProfileOptions {...commonProps} />
          </div>
        )}

        <div className="content">
          <div className="titleRow">
            <h1>{t_pageTitle}</h1>
            {!props.isMobile && (
              <button
                className="btn-primary"
                onClick={() => setShowModal(true)}
              >
                {t_addButton}
              </button>
            )}
          </div>
          <SelectPerspective {...props} {...commonProps} />
          <div className="list">
            {(props.tab === 'owner'
              ? props.workpiecesByOwner
              : props.workpiecesByRightHolder
            ).map((el) => (
              <Workpiece key={el.workpiece_id} {...commonProps} {...el} />
            ))}
            {props.tab === 'owner' && props.workpiecesByOwner.length === 0 && (
              <EmptyOwnerSongs {...commonProps} />
            )}
            {props.tab === 'rightHolder' &&
              props.workpiecesByRightHolder.length === 0 && (
                <EmptyRightholderSongs {...commonProps} />
              )}
          </div>
        </div>
      </div>
      {props.isMobile && (
        <>
          <button
            className="btn-icon mobile"
            onClick={() => setShowModal(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5Z"
                fill="white"
              />
            </svg>
          </button>
          <MobileDownBar current="workpieces" />
        </>
      )}
      {/* <MobileNav {...commonProps} /> */}
    </div>
  );
};

export default Workpieces;
