import { useState } from 'react';
import Action from './action/action';
import SongPlaceholder from '../../../../icons/songPlaceholder';
import VertEllipsis from '../../../../icons/vertEllipsis';

const Workpiece = (props) => {
  const t_songCreator =
    props.owner &&
    props.owner.firstName &&
    props.owner.lastName &&
    `par ${props.owner.firstName} ${props.owner.lastName}`;
  const t_songTitle = props.title;

  const commonProps = {
    ...props,
  };
  return (
    <div className="workpiece">
      <div className="left">
        <div className="img">
          <SongPlaceholder />
        </div>
        <div className="details">
          <div className="b1">
            {t_songTitle && <span className="title">{t_songTitle}</span>}
            {t_songCreator && t_songCreator}
          </div>
        </div>
      </div>

      <div className="right">
        <Action {...props} />
        <Ellipsis />
      </div>
    </div>
  );
};

const Ellipsis = () => {
  const [showWorkpieceOptions, setShowWorkpieceOptions] = useState(false);
  const toggleMenu = () => setShowWorkpieceOptions((e) => !e);
  const handleDelete = () => {};
  const t_deleteButton = 'DELETE WORKPIECE';
  return (
    <span className="ellipsis" onClick={toggleMenu}>
      <VertEllipsis />
      {showWorkpieceOptions && (
        <button className="workpieceMenuOption" onClick={handleDelete}>
          {t_deleteButton}
        </button>
      )}
    </span>
  );
};
export default Workpiece;
