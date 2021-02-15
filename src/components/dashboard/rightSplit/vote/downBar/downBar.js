import { useParams, useHistory } from 'react-router-dom';
import voteRightSplit from '../../../../../api/workpieces/voteRightSplit';

const DownBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleSubmit = async () => {
    const { copyright, performance, recording } = props;
    await voteRightSplit({
      copyright,
      performance,
      recording,
      workpiece_id,
    });
    props.resetData();
    history.push(`/workpiece/${workpiece_id}/right-split/summary`);
  };
  return (
    <div className="downBar">
      <div className="b1">
        <div />
        <button onClick={handleSubmit} className="submit">
          Soumettre mon vote
        </button>
      </div>
    </div>
  );
};

export default DownBar;
