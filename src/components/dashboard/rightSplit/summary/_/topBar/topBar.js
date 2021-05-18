import { useParams, useHistory } from 'react-router-dom';
import ArrowLeft from '../../../../../../icons/arrowLeft';
import ProfileOptions from '../../../../_/profileOptions/profileOptions';
import CoverImage from '../../../../_/coverImage/coverImage';

const TopBar = (props) => {
  const { workpiece_id } = useParams();
  const history = useHistory();
  const handleBack = () => {
    history.push(`/workpiece/${workpiece_id}`);
  };
  const t_pageTitle = {
    fr: 'Partage des droits',
    en: 'Share your rights',
  }[props.language];
  return (
    <div className="topBar">
      <button className="btn-icon" onClick={handleBack}>
        <ArrowLeft />
      </button>
      <div className="center">
        <CoverImage {...props} />
        <p>
          <b>{props.workpiece.title}</b> · {t_pageTitle}
        </p>
      </div>
      <ProfileOptions {...props} />
    </div>
  );
};

export default TopBar;
