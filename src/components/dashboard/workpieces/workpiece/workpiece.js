import { useState } from 'react';
import Action from './action/action';
import VertEllipsis from '../../../../icons/vertEllipsis';
import CoverImage from '../../_/coverImage/coverImage';

const Workpiece = (props) => {
  const t_by = {
    fr: 'par',
    en: 'by',
  }[props.language];
  const t_songCreator =
    props.owner &&
    props.owner.firstName &&
    props.owner.lastName &&
    `${t_by} ${props.owner.firstName} ${props.owner.lastName}`;
  const t_songTitle = props.title;
  const coverImage =
    props &&
    props.documentation &&
    props.documentation.files &&
    props.documentation.files.art &&
    props.documentation.files.art.length
      ? props.documentation.files.art[props.documentation.files.art.length - 1]
        .url
      : null;
  const commonProps = {
    ...props,
  };
  return (
    <div className="workpiece">
      <div className="left">
        <div className="img">
          <CoverImage className="small" coverImage={coverImage} />
        </div>
        <div className="details">
          <div className="b1">
            {t_songTitle && <span className="title">{t_songTitle}</span>}
            {t_songCreator && t_songCreator}
          </div>
        </div>
      </div>

      <div className="right">
        <Action {...commonProps} />
        {props.tab === 'owner' && <Ellipsis {...commonProps} />}
      </div>
    </div>
  );
};

const Ellipsis = (props) => {
  const [showWorkpieceOptions, setShowWorkpieceOptions] = useState(false);
  const openMenu = () => {
    setTimeout(() => {
      document.getElementById('workpieceMenu').focus();
    }, 0);
    setShowWorkpieceOptions(true);
  };
  const closeMenu = () => {
    setShowWorkpieceOptions(false);
  };
  const handleDelete = () => {};
  const t_deleteButton = {
    fr: 'Supprimer cette pièce',
    en: 'Delete this workpiece',
  }[props.user.locale];

  return (
    <span
      className="ellipsis"
      onClick={showWorkpieceOptions ? closeMenu : openMenu}
    >
      <VertEllipsis />
      {showWorkpieceOptions && (
        <button
          className="workpieceMenuOption"
          onClick={handleDelete}
          tabIndex="0"
          id="workpieceMenu"
          onBlur={closeMenu}
        >
          {t_deleteButton}
        </button>
      )}
    </span>
  );
};

export default Workpiece;
