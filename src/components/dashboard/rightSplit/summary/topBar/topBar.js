import { Link, useParams, useHistory } from 'react-router-dom';
import ArrowLeft from '../../../../../icons/arrowLeft';
import SongPlaceholder from '../../../../../icons/songPlaceholder';
import ProfileOptions from '../../../_/profileOptions/profileOptions';

const TopBar = (props) => {
  const { workpiece_id } = useParams();
  const history = useHistory();
  const handleBackBtn = async () => {
    history.push(`/workpiece/${workpiece_id}`);
  };
  const t_pageTitle = {
    fr: 'Partage des droits',
    en: 'Share your rights',
  }[props.language];
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
        <div className="pageTitle">- {t_pageTitle}</div>
      </div>
      <ProfileOptions {...props} />
    </div>
  );
};

export default TopBar;
