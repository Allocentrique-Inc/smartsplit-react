import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';

export default function RejectedRightSplitArchived(props) {
  const versionIndex = props.archivedRightSplit.version;
  return (
    <div className="rightSplit" onClick={props.handleClick}>
      <div className="title">{`Version ${versionIndex}`}</div>
      <div className="details">
        {props.t_createdBy}
        <ArtistName
          user={props.archivedRightSplit.owner}
          className="artistName"
        />
        <LastModified
          date={props.archivedRightSplit.createdAt}
          language={props.language}
        />
      </div>
      <div className="b1">
        <div />
        <div className="status rejectedStatus">{props.t_rejected}</div>
      </div>
      <button>{props.t_consult}</button>
    </div>
  );
}
