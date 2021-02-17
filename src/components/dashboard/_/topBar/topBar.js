import { useParams, useHistory } from 'react-router-dom';
import SongPlaceholder from '../../../../icons/songPlaceholder';
import ChevronRight from '../../../../icons/chevron-right';

const TopBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const title = props.workpiece.title || '';
  return (
    <div className="topBar">
      <div className="bx">
        <SongPlaceholder />

        <div className="title">{title}</div>
        <div className="breadCrumb">
          <div className="p1">{props.crumb1}</div>
          <ChevronRight />

          <div className="p2">{props.crumb2}</div>
        </div>
      </div>
      <div className="bx">
        <div className="credit" />
        <div className="saveAndQuit" onClick={props.onQuitAction}>
          Save And Quit
        </div>
        <div className="profile" />
      </div>
    </div>
  );
};

export default TopBar;
