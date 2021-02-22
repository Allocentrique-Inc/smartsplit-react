import { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Tile from './tile/tile';
import PenIcon from '../../../icons/pen';
import ArrowLeft from '../../../icons/arrowLeft';
import AddOrEditWorkpieceModal from '../_/addOrEditWorkpieceModal/addOrEditWorkpieceModal';
import Collaborators from './collaborators/collaborators';
import SongPlaceholder from '../../../icons/songPlaceholder';
import ProfileOptions from '../_/profileOptions/profileOptions';

const Orientation = (props) => {
  const [tab, setTab] = useState('task');
  const history = useHistory();
  const { workpiece_id } = useParams();
  const [isEditingWorkpiece, setIsEditingWorkpiece] = useState(false);
  const [isEditingCollaborators, setIsEditingCollaborators] = useState(false);
  const handleBackButton = async () => {
    history.push('/');
  };

  const t_createdBy =
    props.workpiece &&
    props.workpiece.owner &&
    props.workpiece.owner.firstName &&
    props.workpiece.owner.lastName &&
    `${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName}`;

  const handleEditWorkpiece = () => setIsEditingWorkpiece(true);
  const handleSelectTask = () => setTab('task');
  const taskTabClassName = `tab ${tab === 'task' ? 'selectedTab' : ''}`;
  if (!props.workpiece) return null;

  const commonProps = {
    ...props,
    workpiece_id,
  };
  return (
    <div className="orientation">
      {/** EDIT WORKPIECE MODAL */}
      {isEditingWorkpiece && (
        <AddOrEditWorkpieceModal
          {...commonProps}
          setShowModal={setIsEditingWorkpiece}
        />
      )}

      {/** EDIT COLLABORATORS MODAL */}
      {isEditingCollaborators && (
        <Collaborators
          {...commonProps}
          setShowModal={setIsEditingCollaborators}
        />
      )}

      <div className="b1">
        <div className="content">
          {/** TOP BAR SECTION ONE */}
          <div className="b1">
            <div className="back" onClick={handleBackButton}>
              <ArrowLeft />
            </div>
            <div className="right">
              <ProfileOptions {...commonProps} />
            </div>
          </div>

          {/** TOP BAR SECTION TWO */}
          <div className="b2">
            <div className="left">
              <div className="image">
                <SongPlaceholder size={72} />
              </div>
              <div className="description">
                <div className="title">
                  {props.workpiece.title}
                  <button className="btn-icon" onClick={handleEditWorkpiece}>
                    <PenIcon />
                  </button>
                </div>
                <div className="details">
                  {t_createdBy && 'créé par'}
                  <span className="artistName">{t_createdBy}</span>
                </div>
              </div>
            </div>
          </div>

          {/** TOP BAR SECTION THREE */}
          <div className="b3">
            <button className={taskTabClassName} onClick={handleSelectTask}>
              Taches
            </button>
            <span className="space" />
          </div>
        </div>
      </div>

      {/** TILES SECTION */}
      <div className="b2">
        <div className="tileSection">
          <Tile tileId="share" {...commonProps} />
          {/* <div className="space" />
          <Tile tileId="document" {...commonProps} />
          <div className="space" />
          <Tile tileId="protect" {...commonProps} />
          <Tile tileId="" {...commonProps} />
          <div className="space" />
          <Tile tileId="" {...commonProps} /> */}
        </div>
      </div>
    </div>
  );
};

export default Orientation;
