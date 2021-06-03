import { useParams, useHistory } from 'react-router-dom';
import CoverImage from '../../../_/coverImage/coverImage';
import ProfileOptions from '../../../_/profileOptions/profileOptions';
import ChevronRight from '../../../../../icons/chevron-right';

const TopBar = (props) => {
  const { workpiece_id } = useParams();
  const history = useHistory();
  const handleBack = () => {
    history.push(`/workpiece/${workpiece_id}`);
  };
  const t_pageTitle = {
    fr: 'Protège ton oeuvre',
    en: 'Protect your work',
  }[props.language];
  const t_saveAndQuit = {
    fr: 'Sauvegarder et quitter',
    en: 'Save and quit',
  }[props.language];
  return (
    <div className="topBar">
      <div className="left">
        <CoverImage {...props} />
        <p>
          <b>{props.workpiece.title}</b>
        </p>
        <div className="breadCrumbs">
          <p>{t_pageTitle}</p>
          <ChevronRight />
          <p>{props.rightCrumb}</p>
        </div>
      </div>
      <div className="right">
        <button className="btn-secondary">{t_saveAndQuit}</button>
        <ProfileOptions {...props} />
      </div>
    </div>
  );
};

export default TopBar;
