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
import Plus from '../../../icons/plus';
import AddOrEditWorkpieceMobile from '../_/addOrEditWorkpieceMobile/addOrEditWorkpieceMobile';

const Workpieces = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [workpieceInDeletion, setWorkpieceInDeletion] = useState(null);
  const [showWorkpieceForm, setShowWorkpieceForm] = useState(false);
  useEffect(() => {
    if (!props.isMobile && showWorkpieceForm) setShowWorkpieceForm(false);
  }, [props.isMobile]);

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
    setShowWorkpieceForm,
  };

  return (
    <>
      {!showWorkpieceForm && (
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
                {props.tab === 'owner' &&
                  props.workpiecesByOwner.length === 0 && (
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
                onClick={() => setShowWorkpieceForm(true)}
              >
                <Plus />
              </button>
              <MobileDownBar current="workpieces" />
            </>
          )}
        </div>
      )}
      {showWorkpieceForm && <AddOrEditWorkpieceMobile {...commonProps} />}
    </>
  );
};

export default Workpieces;
