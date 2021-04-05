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
import MobileNav from './mobileNav/mobileNav';

const Workpieces = (props) => {
  const user_id = localStorage.getItem('user_id');
  const [workpiecesByOwner, setWorkpiecesByOwner] = useState([]);
  const [workpiecesByRightHolder, setWorkpiecesByRightHolder] = useState([]);
  const [tab, setTab] = useState('owner');
  const [showModal, setShowModal] = useState(false);
  const [workpieceInDeletion, setWorkpieceInDeletion] = useState(null);

  const resetWorkpiecesByOwner = async (firstLoad) => {
    const workpiecesByOwner = await getWorkpiecesByOwner({ user_id });
    setWorkpiecesByOwner(workpiecesByOwner);
    if (firstLoad && workpiecesByOwner.length === 0) {
      setTab('rightHolder');
    }
    props.setIsLoaded(true);
  };
  const resetWorkpiecesByRightHolder = async () => {
    const workpiecesByRightHolder = await getWorkpiecesByRightHolder({
      user_id,
    });
    setWorkpiecesByRightHolder(workpiecesByRightHolder);
    props.setIsLoaded(true);
  };
  const resetData = async (params) => {
    props.setIsLoaded(false);
    const firstLoad = params && params.firstLoad;
    resetWorkpiecesByOwner(firstLoad);
    resetWorkpiecesByRightHolder();
  };

  useEffect(() => {
    resetData({ firstLoad: true });
  }, []);

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
    resetData,
    tab,
    setTab,
    setShowModal,
    setWorkpieceInDeletion,
    workpieceInDeletion,
    resetWorkpiecesByOwner,
  };

  return (
    <div className="workpieces">
      {showModal && <AddOrEditWorkpieceModal {...commonProps} />}
      {workpieceInDeletion && <DeletingWorkpiece {...commonProps} />}
      <LeftMenu {...commonProps} />
      <div className="rightContent">
        <div className="topBar">
          {/* <div className="searchBar" /> */}
          <div />
          <ProfileOptions {...commonProps} />
        </div>

        <div className="content">
          <div className="titleRow">
            <div className="title">{t_pageTitle}</div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              {t_addButton}
            </button>
          </div>
          <SelectPerspective {...props} {...commonProps} />
          <div className="list">
            {(tab === 'owner'
              ? workpiecesByOwner
              : workpiecesByRightHolder
            ).map((el) => (
              <Workpiece
                key={el.workpiece_id}
                {...commonProps}
                {...el}
                tab={tab}
              />
            ))}
            {tab === 'owner'
              ? workpiecesByOwner.length === 0 && (
              <EmptyOwnerSongs {...commonProps} />
                )
              : workpiecesByRightHolder.length === 0 && (
              <EmptyRightholderSongs {...commonProps} />
                )}
          </div>
        </div>
      </div>
      <MobileNav {...commonProps} />
    </div>
  );
};

export default Workpieces;
