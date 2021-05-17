import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';
import Tag from '../_/tag/tag';

const DraftRightSplit = (props) => {
  const versionIndex = props.workpiece.rightSplit.version;
  const t_sendToCollab = {
    fr: 'Envoyer aux collaborateurs',
    en: '',
  }[props.language];
  const canSendToCollab =
    props.workpiece.rightSplit.owner.user_id === props.user.user_id;

  return (
    <div className="rightSplit">
      <div className="clickableContainer" onClick={props.handleClick}>
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <ArtistName
            user={props.workpiece.rightSplit.owner}
            className="artistName"
          />{' '}
          <LastModified
            date={props.workpiece.rightSplit.createdAt}
            language={props.language}
          />
        </div>
        {props.isMobile && <Tag type="draft" language={props.language} />}
        {!props.isMobile &&
          (canSendToCollab ? (
            <>
              <div className="separator" />
              <button>{t_sendToCollab}</button>
            </>
          ) : (
            <button>{props.t_consult}</button>
          ))}
      </div>
    </div>
  );
};
export default DraftRightSplit;
