import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';
import Tag from '../_/tag/tag';

const InVoteRightSplit = (props) => {
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
        {props.isMobile ? (
          <Tag type="inVote" language={props.language} />
        ) : (
          <>
            <div className="separator" />
            <button>{props.t_consult}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default InVoteRightSplit;
