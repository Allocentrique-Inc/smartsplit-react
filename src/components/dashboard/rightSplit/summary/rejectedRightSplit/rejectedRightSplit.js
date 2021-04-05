import { useHistory, useParams } from 'react-router-dom';
import LastModified from '../../../_/lastModified/lastModified';
import ArtistName from '../../../_/artistName/artistName';

export default function RejectedRightSplit(props) {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const versionIndex = props.workpiece.rightSplit.version;
  const handleCreateANewModelBtn = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/copyright`);
  return (
    <div className="rightSplit" style={{ marginBottom: '8px' }}>
      <div
        className="clickableContainer"
        onClick={() => {
          props.setConsulting(props.workpiece.rightSplit);
        }}
      >
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <ArtistName
            user={props.workpiece.rightSplit.owner}
            className="artistName"
          />
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
        <button onClick={handleCreateANewModelBtn}>
          {props.t_createANewOne}
        </button>
        <button>{props.t_consult}</button>
      </div>
    </div>
  );
}
