import LastModified from '../../../_/lastModified/lastModified';

export default function InVoteRightSplit(props) {
  const versionIndex = props.workpiece.rightSplit.version;
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
        </div>
        <div className="update-details">
          <LastModified
            date={props.workpiece.rightSplit.updatedAt}
            language={props.language}
          >
            {props.t_updated}
          </LastModified>
        </div>
        <button>{props.t_consult}</button>
      </div>
    </div>
  );
}
