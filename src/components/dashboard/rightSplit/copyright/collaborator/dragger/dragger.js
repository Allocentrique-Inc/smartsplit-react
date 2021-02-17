import colors from '../../../_/colors';
import Lock from '../../../../../../icons/lock';
import Unlock from '../../../../../../icons/unlock';
import HelpCircleFull from '../../../../../../icons/helpCircleFull';

const Dragger = ({
  shares,
  setShares,
  setLock,
  lock,
  copyrightDividingMethod,
  activeCollaboratorsIds,
  rightHolder_id,
}) => {
  const handleClick = (e) => {
    const newValue = Math.round(
      (e.clientX - e.target.getBoundingClientRect().x) / 3.28,
    );
    setShares(newValue);
  };
  const handleLockBtn = () => setLock(!lock);
  const isManual = copyrightDividingMethod === 'manual';
  return (
    <div className="dragger">
      <div className="lock">
        {isManual && (
          <button
            className={lock ? 'locked' : 'unlocked'}
            onClick={handleLockBtn}
          >
            {lock ? <Lock /> : <Unlock />}
          </button>
        )}
      </div>
      <div className="buttonBar" onClick={handleClick}>
        <div className="bar">
          <div
            className="color"
            style={{
              width: shares ? `${(shares / 100) * 328}px` : '0px',
              backgroundColor:
                colors[activeCollaboratorsIds.indexOf(rightHolder_id)],
            }}
          />
          {isManual && <div className="whiteBall" />}
        </div>
      </div>
      <div className="shares">
        {!Number.isNaN(shares) && `${shares.toFixed(1)} %`}
      </div>
    </div>
  );
};

export default Dragger;
