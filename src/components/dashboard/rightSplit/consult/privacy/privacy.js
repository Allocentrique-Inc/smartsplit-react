// import Collaborator from './collaborator/collaborator';
import { useHistory, useParams } from 'react-router-dom';

const Privacy = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/privacy`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">Privacy</div>
        {/* <button className="btn-secondary" onClick={handleButton}>
          modifier
        </button> */}
      </div>
      <div />
      {props.privacy}
    </div>
  );
};

export default Privacy;
