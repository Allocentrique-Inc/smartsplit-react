import colors from '../colors';
import Lock from '../../../../../icons/lock';
import Unlock from '../../../../../icons/unlock';
// import HelpCircleFull from '../../../../../../icons/helpCircleFull';

const Dragger = (props) => {
  const handleClick = (e) => {
    const newValue = Math.round(
      (e.clientX - e.target.getBoundingClientRect().x) / 3.28,
    );
    props.setShares(newValue);
  };
  const handleLockBtn = () => props.setLock(!props.collaborator.lock);
  return (
    <div className="dragger">
      <div className="lock">
        {props.isDraggable && (
          <button
            className={props.collaborator.lock ? 'locked' : 'unlocked'}
            onClick={handleLockBtn}
          >
            {props.collaborator.lock ? <Lock /> : <Unlock />}
          </button>
        )}
      </div>
      <div className="buttonBar" onClick={handleClick}>
        <div className="bar">
          <div
            className="color"
            style={{
              width: props.collaborator.shares
                ? `${(props.collaborator.shares / 100) * 328}px`
                : '0px',
              backgroundColor:
                colors[
                  props.activeCollaboratorsIds.indexOf(
                    props.collaborator.rightHolder_id,
                  )
                ],
            }}
          />
          {props.isDraggable && <div className="whiteBall" />}
        </div>
      </div>
      <div className="shares">
        {!Number.isNaN(props.collaborator.shares) &&
          `${props.collaborator.shares.toFixed(1)} %`}
      </div>
    </div>
  );
};

export default Dragger;
