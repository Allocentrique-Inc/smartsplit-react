import { Link, useParams, useHistory } from 'react-router-dom';
import ArrowLeft from '../../../../../icons/arrowLeft';
import SongPlaceholder from '../../../../../icons/songPlaceholder';

const TopBar = (props) => {
  const { workpiece_id } = useParams();
  const history = useHistory();
  const handleBackBtn = async () => {
    history.push(`/workpiece/${workpiece_id}`);
  };
  return (
    <div className="topBar">
      <div className="side">
        <div className="back" onClick={handleBackBtn}>
          <ArrowLeft />
        </div>
      </div>
      <div className="b1">
        <div className="img">
          <SongPlaceholder />
        </div>
        <div className="title">{props.workpiece.title}</div>
        <div className="pageTitle">- Partage des droits</div>
      </div>
      <div className="side" />
    </div>
  );
};

export default TopBar;
