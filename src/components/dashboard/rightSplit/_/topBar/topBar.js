import { useParams, useHistory } from 'react-router-dom';
import ChevronRight from '../../../../../icons/chevron-right';
import ChevronDown from '../../../../../icons/chevronDown';
import SongPlaceholder from '../../../../../icons/songPlaceholder';

const TopBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleSaveAndQuit = async () => {
    await props.saveRightSplit();
    history.push(`/workpiece/${workpiece_id}`);
  };

  // _text
  const t_title = props.workpiece.title || '';
  const t_breadCrumb1 =
    props.translations.rightSplit.topBar.breadCrumb._rightSplits[
      props.language
    ];
  const t_breadCrumb2 =
    props.translations.rightSplit.topBar.breadCrumb[`_${props.view}`][
      props.language
    ];
  const t_saveAndQuit =
    props.translations.rightSplit.topBar._saveAndQuit[props.language];
  console.log(props);
  const { firstName, lastName } = props.workpiece.owner;
  const t_initials = firstName[0] + lastName[0];
  return (
    <div className="topBar">
      <div className="bx">
        <div className="img">
          <SongPlaceholder />
        </div>
        <div className="title">{t_title}</div>
        <div className="breadCrumb">
          <div className="p1">{t_breadCrumb1}</div>
          <ChevronRight />
          <div className="p2">{t_breadCrumb2}</div>
        </div>
      </div>
      <div className="bx">
        <div className="credit" />
        <div className="saveAndQuit" onClick={handleSaveAndQuit}>
          {t_saveAndQuit}
        </div>
        <div className="avatar">{t_initials}</div>
        <div className="chevronDown">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
