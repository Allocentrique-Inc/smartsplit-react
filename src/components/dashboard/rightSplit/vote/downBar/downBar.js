import { useParams, useHistory } from 'react-router-dom';
import voteRightSplit from '../../../../../api/workpieces/voteRightSplit';

const DownBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  console.log({ props });
  const handleSubmit = async () => {
    const { votes } = props;
    await voteRightSplit({
      ...votes,
      workpiece_id,
    });
    await props.resetData();
    history.push(`/workpiece/${workpiece_id}/right-split/summary`);
  };
  return (
    <div className="downBar">
      <div className="b1">
        <div className="right">
          <div className="voteCount">
            {`${props.voteTotal} / ${props.voteNbrNeeded} ${props.t_voteCount}`}
          </div>
          <button
            onClick={handleSubmit}
            className="submit"
            disabled={props.voteTotal / props.voteNbrNeeded !== 1}
          >
            {props.t_submitVote}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownBar;
