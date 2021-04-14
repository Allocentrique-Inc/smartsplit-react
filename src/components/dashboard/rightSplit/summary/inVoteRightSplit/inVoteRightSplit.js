import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';

export default function InVoteRightSplit(props) {
  const versionIndex = props.workpiece.rightSplit.version;
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
        <button>{props.t_consult}</button>
      </div>
    </div>
  );
}
