import LastModified from '../../../_/lastModified/lastModified';

export default function RejectedRightSplitArchived(props) {
  const versionIndex = props.archivedRightSplit.version;
  return (
    <div
      className="rightSplit"
      onClick={() => props.setConsulting(props.workpiece.rightSplit)}
    >
      <div className="title">{`Version ${versionIndex}`}</div>
      <div className="details">
        {props.t_createdBy}
        <span className="artistName">
          {` ${props.archivedRightSplit.owner.firstName} ${props.archivedRightSplit.owner.lastName} `}
        </span>
      </div>
      <div className="update-details">
        <LastModified
          date={props.workpiece.rightSplit.updatedAt}
          language={props.language}
        >
          {props.t_updated}
        </LastModified>
      </div>
      <div className="b1">
        <div />
        <div className="status rejectedStatus">{props.t_rejected}</div>
      </div>
      <button>{props.t_consult}</button>
    </div>
  );
}
