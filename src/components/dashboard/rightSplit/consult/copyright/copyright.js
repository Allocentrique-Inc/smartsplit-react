import { useHistory, useParams } from 'react-router-dom';
import Collaborator from './collaborator/collaborator';

const Copyright = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/copyright`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">Copyright</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            modifier
          </button>
        )}
      </div>
      {props.rightSplitInConsultation.copyright.map((collaborator) => {
        const rightSplit = props.rightSplitInConsultation.copyright;
        return (
          <Collaborator
            {...props}
            collaborator={collaborator}
            rightSplit={rightSplit}
            key={collaborator.rightHolder_id}
          />
        );
      })}
    </div>
  );
};

export default Copyright;
