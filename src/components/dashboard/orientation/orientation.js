import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Tile from './tile/tile';
import PenIcon from '../../../icons/pen';
import AddOrEditWorkpieceModal from '../_/addOrEditWorkpieceModal/addOrEditWorkpieceModal';

const Orientation = (props) => {
  const [tab, setTab] = useState('task');
  const { workpiece_id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const commonProps = { ...props };
  if (!props.workpiece) return null;
  return (
    <div className="orientation">
      {showModal && (
        <AddOrEditWorkpieceModal
          {...commonProps}
          workpieceId={workpiece_id}
          setShowModal={setShowModal}
        />
      )}
      <div className="b1">
        <div className="content">
          <div className="b1">
            <div className="back">
              <Link to="/">BACK</Link>
            </div>
            <div className="right">
              <div className="credit" />
              <div className="profile" />
            </div>
          </div>

          <div className="b2">
            <div className="left">
              <div className="image">Image</div>
              <div className="description">
                <div className="title">
                  {props.workpiece.title}
                  <button
                    className="btn-icon"
                    onClick={() => setShowModal(true)}
                  >
                    <PenIcon />
                  </button>
                </div>
                <div className="details">
                  {'--------- créé par  '}
                  <span className="artistName">
                    {`${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName}`}
                  </span>
                  {' - Mis à jour --------'}
                </div>
              </div>
            </div>
            <div className="right">Collaborators</div>
          </div>
          <div className="b3">
            <button
              className={`tab ${tab === 'task' ? 'selectedTab' : ''}`}
              onClick={() => {
                setTab('task');
              }}
            >
              Taches
            </button>
            <span className="space" />
            <button
              className={`tab ${tab === 'file' ? 'selectedTab' : ''}`}
              onClick={() => {
                setTab('file');
              }}
              style={{ backgroundColor: 'rgba(214, 196, 162, 0.25)' }}
            >
              Fichier
            </button>
          </div>
        </div>
      </div>

      <div className="b2">
        <div className="tileSection">
          <Tile tileId="share" {...commonProps} />
          <div className="space" />
          <Tile tileId="document" {...commonProps} />
          <div className="space" />
          <Tile tileId="protect" {...commonProps} />
          <Tile tileId="" {...commonProps} />
          <div className="space" />
          <Tile tileId="" {...commonProps} />
        </div>
      </div>
    </div>
  );
};

export default Orientation;
