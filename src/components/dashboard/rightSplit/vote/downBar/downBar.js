import { useParams, useHistory } from 'react-router-dom';
import voteRightSplit from '../../../../../api/workpieces/voteRightSplit';

const DownBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleSubmit = async () => {
    const { copyright, performance, recording, privacy, label } = props;
    await voteRightSplit({
      copyright,
      performance,
      recording,
      privacy,
      label,
      workpiece_id,
    });
    props.resetData();
    history.push(`/workpiece/${workpiece_id}/right-split/summary`);
  };
  return (
    <div className="downBar">
      <div className="b1">
        <div />

        <div className="right">
          <div className="voteCount">
            {`${props.voteTotal} / ${props.voteNbrNeeded} ${props.t_voteCount}`}
          </div>
          <button
            onClick={handleSubmit}
            className="submit"
            disabled={props.voteTotal / props.voteNbrNeeded !== 1}
          >
            Soumettre mon vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownBar;
