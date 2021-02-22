import { useHistory, useParams } from 'react-router-dom';
import Collaborator from './collaborator/collaborator';

const Recording = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/recording`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">Recording</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            modifier
          </button>
        )}
      </div>
      {[
        props.rightSplitInConsultation.label
          ? props.rightSplitInConsultation.label
          : '',
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
