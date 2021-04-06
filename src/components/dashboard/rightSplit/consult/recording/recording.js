import { useHistory, useParams } from 'react-router-dom';
import Collaborator from '../_/collaborator/collaborator';

const Recording = (props) => {
  const history = useHistory();
  const labelIsSelected = props.label && Object.keys(props.label).length > 0;
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/recording`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">{props.t_recording}</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            {props.t_modify}
          </button>
        )}
      </div>
      {labelIsSelected && (
        <Collaborator
          {...props}
          collaborator={props.label}
          key={props.label.rightHolder_id}
          collaboratorType="label"
        />
      )}
      {props.recording.map((collaborator, id) => (
        <Collaborator
          {...props}
          collaborator={collaborator}
          key={collaborator.rightHolder_id}
          collaboratorType="recording"
        />
      ))}
    </div>
  );
};

export default Recording;
