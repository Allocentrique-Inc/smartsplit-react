import colors from '../../../_/colors';

const Dragger = ({
  shares, setShares, setLock, lock, id,
}) => {
  const handleClick = (e) => {
    const newValue = Math.round(
      (e.clientX - e.target.getBoundingClientRect().x) / 3,
    );
    setShares(newValue);
  };
  const handleLockBtn = () => setLock(!lock);
  const isManual = true;
  return (
    <div className="dragger">
      <div className="lock">
        {isManual && (
          <button
            className={lock ? 'locked' : 'unlocked'}
            onClick={handleLockBtn}
          >
            {lock ? 'L' : 'U'}
          </button>
        )}
      </div>
      <div className="buttonBar" onClick={handleClick}>
        <div className="bar">
          <div
            className="color"
            style={{
              width: shares ? `${(shares / 100) * 300}px` : '0px',
              backgroundColor: colors[id],
            }}
          />
        </div>
      </div>
      <div className="shares">
        {!Number.isNaN(shares) && `${shares.toFixed(1)} %`}
      </div>
    </div>
  );
};

export default Dragger;
