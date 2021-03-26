import { useHistory, useParams } from 'react-router-dom';
import Collaborator from './collaborator/collaborator';

const Recording = (props) => {
  const history = useHistory();
  const isLabelSelected =
    props.rightSplitInConsultation.label &&
    Object.keys(props.rightSplitInConsultation.label).length > 0;
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
      {[
        isLabelSelected ? props.rightSplitInConsultation.label : '',
        ...props.rightSplitInConsultation.recording,
      ]
        .filter((e) => e !== '')
        .map((collaborator, id) => (
          <Collaborator
            {...props}
            collaborator={collaborator}
            key={collaborator.rightHolder_id}
          />
        ))}
    </div>
  );
};

export default Recording;
