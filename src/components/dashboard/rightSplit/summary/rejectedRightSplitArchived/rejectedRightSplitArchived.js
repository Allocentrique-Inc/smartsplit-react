import { useHistory } from 'react-router-dom';
import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';
import Tag from '../_/tag/tag';

const RejectedRightSplitArchived = (props) => {
  const history = useHistory();
  const versionIndex = props.archivedRightSplit.version;
  const handleClick = () => {
    if (props.isMobile) {
      history.push(
        `/workpiece/${props.workpiece_id}/right-split/${versionIndex}/consult`,
      );
    } else {
      props.setRightSplitInConsultation(props.archivedRightSplit);
      props.setShowModal(true);
    }
  };
  return (
    <div className="rightSplit" onClick={handleClick}>
      <div className="clickableContainer" onClick={props.handleClick}>
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <ArtistName
            user={props.archivedRightSplit.owner}
            className="artistName"
          />{' '}
          <LastModified
            date={props.archivedRightSplit.createdAt}
            language={props.language}
          />
        </div>
        <Tag type="rejected" language={props.language} />
        {!props.isMobile && (
          <>
            <div className="separator" />
            <button>{props.t_consult}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RejectedRightSplitArchived;
