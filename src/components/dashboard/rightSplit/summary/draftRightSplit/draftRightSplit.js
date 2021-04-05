import LastModified from '../../../_/lastModified/lastModified';

export default function DraftRightSplit(props) {
  const versionIndex = props.workpiece.rightSplit.version;
  const t_sendToCollab = {
    fr: 'Envoyer aux collaborateurs',
    en: '',
  }[props.user.locale];
  const canSendToCollab =
    props.workpiece.rightSplit.owner.user_id === props.user.user_id;

  return (
    <div className="rightSplit">
      <div
        className="clickableContainer"
        onClick={() => props.setConsulting(props.workpiece.rightSplit)}
      >
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <span className="artistName">
            {` ${props.workpiece.rightSplit.owner.firstName} ${props.workpiece.rightSplit.owner.lastName} `}
          </span>
          <LastModified
            date={props.workpiece.rightSplit.createdAt}
            language={props.language}
          />
        </div>
        <div className="b1">
          <div />
        </div>

        {canSendToCollab ? (
          <>
            <div className="border" />
            <button>{t_sendToCollab}</button>
          </>
        ) : (
          <button>{props.t_consult}</button>
        )}
      </div>
    </div>
  );
}
