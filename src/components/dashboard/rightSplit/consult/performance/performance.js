import { useHistory, useParams } from 'react-router-dom';
import Collaborator from './collaborator/collaborator';

const Performance = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/performance`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">Performance</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            modifier
          </button>
        )}
      </div>
      {props.rightSplitInConsultation.performance.map((collaborator, id) => (
        <Collaborator
          {...props}
          collaborator={collaborator}
          key={collaborator.rightHolder_id}
        />
      ))}
    </div>
  );
};

export default Performance;
