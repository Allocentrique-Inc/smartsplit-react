import { Link, useHistory, useParams } from 'react-router-dom';
import HighFive from '../../../../../icons/high-five';

const Success = (props) => {
  const t_title = props.translations.rightSplit.success._title[props.language];
  const t_description =
    props.translations.rightSplit.success._description[props.language];
  const t_goto = props.translations.rightSplit.success._goto[props.language];
  const history = useHistory();
  const { workpiece_id } = useParams();
  return (
    <>
      <div className="topBar">
        <div className="title">Partage créé!</div>
        <button className="exit" onClick={() => props.setIsSaved(false)}>
          x
        </button>
      </div>
      <div className="content success">
        <HighFive />
        <div className="text1">{t_title}</div>
        <div className="text2">{t_description}</div>
        <div className="text3" />
      </div>
      <div className="downBar">
        <button
          className="btn-primary"
          onClick={() => {
            history.push(`/workpiece/${workpiece_id}/right-split/summary`);
          }}
        >
          {t_goto}
        </button>
      </div>
    </>
  );
};

export default Success;
