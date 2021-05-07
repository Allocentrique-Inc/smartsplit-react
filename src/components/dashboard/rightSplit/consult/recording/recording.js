import { useHistory, useParams } from 'react-router-dom';
import Collaborator from '../_/collaborator/collaborator';
import Pen from '../../../../../icons/pen';

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
        {!props.voting && props.isEditable && (
          <button className="btn-secondary-small" onClick={handleButton}>
            <Pen color="#2DA84F" size={16} />
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
