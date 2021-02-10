import { useEffect, useState } from 'react';

import getWorkpiecesByOwner from '../../../api/workpieces/getWorkpiecesByOwner';
import getWorkpiecesByRightHolder from '../../../api/workpieces/getWorkpiecesByRightHolder';
import disconnect from '../../../api/auth/disconnect';

import Workpiece from './workpiece/workpiece';
import LeftMenu from './leftMenu/leftMenu';
import AddWorkpiece from './addWorkpiece/addWorkPiece';
import SelectPerspective from './selectPerspective/selectPerspective';

const Workpieces = (props) => {
  const user_id = localStorage.getItem('user_id');
  const [workpiecesByOwner, setWorkpiecesByOwner] = useState([]);
  const [workpiecesByRightHolder, setWorkpiecesByRightHolder] = useState([]);
  const [tab, setTab] = useState('owner');

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
    // eslint-disable-next-line
  }, []);

  const commonProps = {
    resetData,
    tab,
    setTab,
  };

  return (
    <div className="workpieces">
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
            <AddWorkpiece {...props} {...commonProps} />
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
