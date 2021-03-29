import { Link, useParams, useHistory } from 'react-router-dom';
import ArrowLeft from '../../../../../icons/arrowLeft';
import SongPlaceholder from '../../../../../icons/songPlaceholder';
import ProfileOptions from '../../../_/profileOptions/profileOptions';
import CoverImage from '../../../_/coverImage/coverImage';

const TopBar = (props) => {
  const coverImage =
    props &&
    props.workpiece.documentation &&
    props.workpiece.documentation.files &&
    props.workpiece.documentation.files.art &&
    props.workpiece.documentation.files.art.length
      ? props.workpiece.documentation.files.art[props.workpiece.documentation.files.art.length - 1]
        .url
      : null;
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
          <CoverImage coverImage={coverImage} />
        </div>
        <div className="title">{props.workpiece.title}</div>
        <div className="pageTitle">- {t_pageTitle}</div>
      </div>
      <ProfileOptions {...props} />
    </div>
  );
};

export default TopBar;
