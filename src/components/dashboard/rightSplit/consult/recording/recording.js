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
        {!props.voting && (
          <button className="btn-secondary" onClick={handleButton}>
            modifier
          </button>
        )}
      </div>
      {props.workpiece.rightSplit.recording.map((el, id) => {
        let collaborator = typeof el.rightHolder === 'string'
          ? props.collaborators.find((EL) => EL.user_id === el.rightHolder)
          : el.rightHolder;
        collaborator = { ...collaborator, ...el };
        const rightSplit = props.workpiece.rightSplit.recording;
        return (
          <Collaborator
            {...props}
            collaborator={collaborator}
            rightSplit={rightSplit}
            key={collaborator.user_id}
          />
        );
      })}
    </div>
  );
};

export default Recording;
