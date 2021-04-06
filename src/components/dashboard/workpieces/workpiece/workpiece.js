import { useState } from 'react';
import Action from './action/action';
import VertEllipsis from '../../../../icons/vertEllipsis';
import CoverImage from '../../_/coverImage/coverImage';
import LastModified from '../../_/lastModified/lastModified';
import ArtistName from '../../_/artistName/artistName';

const Workpiece = (props) => {
  const t_by = {
    fr: 'par',
    en: 'by',
  }[props.language];
  const t_songTitle = props.title;
  const t_mod = {
    fr: 'Modifié',
    en: 'Modified',
  }[props.language];
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
            <ArtistName user={props.owner}>{t_by}</ArtistName>
          </div>
          <div className="b2">
            <LastModified {...props}>{t_mod}</LastModified>
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
  const isMenuShowned = !(props.rightSplit && props.rightSplit._state);
  const openMenu = () => {
    setTimeout(() => {
      try {
        document.getElementById('workpieceMenu').focus();
      } catch (err) {
        console.log(err);
      }
    }, 0);
    setShowWorkpieceOptions(true);
  };
  const closeMenu = () => {
    setShowWorkpieceOptions(false);
  };
  const handleDelete = () => {
    props.setWorkpieceInDeletion(props.workpiece_id);
  };
  const t_deleteButton = {
    fr: 'Supprimer cette pièce',
    en: 'Delete this workpiece',
  }[props.language];

  return (
    <span
      className="ellipsis"
      onClick={showWorkpieceOptions ? closeMenu : openMenu}
    >
      <VertEllipsis />
      {showWorkpieceOptions && isMenuShowned && (
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
