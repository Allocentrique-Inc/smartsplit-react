import { useParams, useHistory } from 'react-router-dom';
import ChevronRight from '../../../../../icons/chevron-right';
import SongPlaceholder from '../../../../../icons/songPlaceholder';
import ProfileOptions from '../../../_/profileOptions/profileOptions';

const TopBar = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();

  const flowErrors = props.calculateFlowErrors(
    props.copyright,
    props.performance,
    props.recording,
    props.label,
  );

  const handleSaveAndQuit = async () => {
    props.setTriedSubmit(true);
    if (flowErrors.length === 0) {
      props.setIsLoaded(false);
      history.push(`/workpiece/${workpiece_id}`);
      await props.saveRightSplit();
    }
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
        <div className="saveAndQuit" onClick={handleSaveAndQuit}>
          {t_saveAndQuit}
        </div>
        <ProfileOptions {...props} />
      </div>
    </div>
  );
};

export default TopBar;
