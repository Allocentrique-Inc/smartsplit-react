import { useHistory, useParams } from 'react-router-dom';
import Collaborator from '../_/collaborator/collaborator';
import Pen from '../../../../../icons/pen';

const Performance = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/performance`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">{props.t_performance}</div>
        {!props.voting && props.isEditable && (
          <button className="btn-secondary-small" onClick={handleButton}>
            <Pen color="#2DA84F" size={16} />
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
