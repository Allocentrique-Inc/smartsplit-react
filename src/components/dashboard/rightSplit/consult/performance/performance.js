import { useHistory, useParams } from 'react-router-dom';
import Collaborator from '../_/collaborator/collaborator';

const Performance = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/performance`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">{props.t_performance}</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            {props.t_modify}
          </button>
        )}
      </div>
      {props.performance.map((collaborator, id) => (
        <Collaborator
          {...props}
          collaboratorType="performance"
          collaborator={collaborator}
          key={collaborator.rightHolder_id}
        />
      ))}
    </div>
  );
};

export default Performance;
