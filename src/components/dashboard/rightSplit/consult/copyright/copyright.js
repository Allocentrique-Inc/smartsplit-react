import { useHistory, useParams } from 'react-router-dom';
import Collaborator from '../_/collaborator/collaborator';
import Pen from '../../../../../icons/pen';

const Copyright = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/copyright`);
  return (
    <div className="consultRightSplitSection">
      <div className="titleRow">
        <div className="title">{props.t_copyright}</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary-small" onClick={handleButton}>
            <Pen color="#2DA84F" size={16} />
            {props.t_modify}
          </button>
        )}
      </div>
      {props.copyright.map((collaborator) => {
        return (
          <Collaborator
            {...props}
            collaboratorType="copyright"
            collaborator={collaborator}
            key={collaborator.rightHolder_id}
          />
        );
      })}
    </div>
  );
};

export default Copyright;
