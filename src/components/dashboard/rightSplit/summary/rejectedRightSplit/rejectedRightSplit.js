import { useHistory, useParams } from 'react-router-dom';
import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';
import Tag from '../_/tag/tag';

export default function RejectedRightSplit(props) {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const versionIndex = props.workpiece.rightSplit.version;
  const handleCreateANewModelBtn = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/copyright`);
  return (
    <div className="rightSplit" style={{ marginBottom: '8px' }}>
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
        <Tag type="rejected" language={props.language} />
        {!props.isMobile && (
          <>
            <button onClick={handleCreateANewModelBtn}>
              {props.t_createANewOne}
            </button>
            <button>{props.t_consult}</button>
          </>
        )}
      </div>
    </div>
  );
}
