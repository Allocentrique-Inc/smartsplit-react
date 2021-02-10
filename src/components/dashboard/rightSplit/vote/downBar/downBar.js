import voteRightSplit from "../../../../../api/workpieces/voteRightSplit"
import { useParams, useHistory } from "react-router-dom";

const DownBar = (props) => {
  const history = useHistory();
  let { workpiece_id } = useParams();
  const handleSubmit = async () => { 
    const {copyright, performance, recording} = props
    await voteRightSplit({copyright, performance, recording, workpiece_id})
    history.push(`/workpiece/${workpiece_id}/right-split/kanban`)
  }
  return (
    <div className="downBar">
      <div className="b1">
        <div />  
        <button onClick={handleSubmit} className="submit">
          Soumettre mon vote
        </button>  
      </div>
    </div>
  )
}

export default DownBar 