import { useEffect, useState } from 'react';

import getWorkpiecesByOwner from '../../../api/workpieces/getWorkpiecesByOwner';
import getWorkpiecesByRightHolder from '../../../api/workpieces/getWorkpiecesByRightHolder';
import disconnect from '../../../api/auth/disconnect';

import Workpiece from './workpiece/workpiece';
import LeftMenu from './leftMenu/leftMenu';
import SelectPerspective from './selectPerspective/selectPerspective';
import AddOrEditWorkpieceModal from '../_/addOrEditWorkpieceModal/addOrEditWorkpieceModal';

const Workpieces = (props) => {
  const user_id = localStorage.getItem('user_id');
  const [workpiecesByOwner, setWorkpiecesByOwner] = useState([]);
  const [workpiecesByRightHolder, setWorkpiecesByRightHolder] = useState([]);
  const [tab, setTab] = useState('owner');
  const [showModal, setShowModal] = useState(false);

  const resetWorkpiecesByOwner = async () => {
    const workpiecesByOwner = await getWorkpiecesByOwner({ user_id });
    setWorkpiecesByOwner(workpiecesByOwner);
  };
  const resetWorkpiecesByRightHolder = async () => {
    const workpiecesByRightHolder = await getWorkpiecesByRightHolder({
      user_id,
    });
    setWorkpiecesByRightHolder(workpiecesByRightHolder);
  };
  const resetData = async () => {
    resetWorkpiecesByOwner();
    resetWorkpiecesByRightHolder();
  };

  useEffect(() => {
    resetData();
  }, []);

  const commonProps = {
    ...props,
    resetData,
    tab,
    setTab,
    setShowModal,
  };
  return (
    <div className="workpieces">
      {showModal && <AddOrEditWorkpieceModal {...commonProps} create />}
      <LeftMenu />
      <div className="rightContent">
        <div className="topBar">
          <div className="searchBar" />
          <div
            className="profile"
            onClick={() => {
              disconnect();
              props.resetLogginCheck();
            }}
          >
            Disconnect
          </div>
        </div>

        <div className="content">
          <div className="titleRow">
            <div className="title">Mes pièces musicales</div>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              Ajouter
            </button>
          </div>
          <SelectPerspective {...props} {...commonProps} />
          <div className="list">
            {(tab === 'owner'
              ? workpiecesByOwner
              : workpiecesByRightHolder
            ).map((el) => (
              <Workpiece key={el.workpiece_id} {...el} {...commonProps} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workpieces;
