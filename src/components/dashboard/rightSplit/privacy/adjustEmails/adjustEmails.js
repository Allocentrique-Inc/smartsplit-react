import { useParams, useHistory } from 'react-router-dom';
import submitRightSplit from '../../../../../api/workpieces/submitRightSplit';
import Copyright from '../../consult/copyright/copyright';

const AdjustEmail = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const { copyright, performance, recording } = props;
  const allSets = [...copyright, ...performance, ...recording];
  const collaborators = [];
  allSets.forEach((el) => {
    const alfa = collaborators.find((EL) => EL.rightHolder === el.rightHolder);
    if (!alfa) {
      const bravo = props.collaborators.find(
        (EL) => EL.user_id === el.rightHolder,
      );
      collaborators.push({ ...el, ...bravo });
    }
  });
  return (
    <div>
      Adjust Emails
      <button
        onClick={async () => {
          await submitRightSplit({
            workpiece_id: props.workpiece.workpiece_id,
          });
          props.resetData();
          history.push(`/workpiece/${workpiece_id}/right-split/summary`);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default AdjustEmail;
