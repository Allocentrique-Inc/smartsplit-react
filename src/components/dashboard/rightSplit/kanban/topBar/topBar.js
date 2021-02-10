import { Link, useParams } from "react-router-dom";

const TopBar = (props) => {
  const { workpiece_id } = useParams();
  return (
    <div className="topBar">
      <div className="side">
        <div className="back">
          <Link to={`/workpiece/${workpiece_id}`}>Back</Link>
        </div>
      </div>
      <div className="b1">
        <div className="img" />
        <div className="title">{props.workpiece.title}</div>
        <div className="pageTitle">- Partage des droits</div>
      </div>
      <div className="side" />
    </div>
  );
};

export default TopBar;
