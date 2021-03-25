import colors from '../../../_/colors';
import Lock from '../../../../../../icons/lock';
import Unlock from '../../../../../../icons/unlock';

const Dragger = (props) => {
  const handleClick = (e) => {
    const newValue = Math.round(
      (e.clientX - e.target.getBoundingClientRect().x) / 3.28,
    );
    props.setShares(newValue);
  };
  return (
    <div className="dragger">
      <div className="lock" />
      <div className="buttonBar" onClick={handleClick}>
        <div className={`bar ${props.limitToHalf ? 'halfBar' : ''}`}>
          <div
            className="color"
            style={{
              width: props.collaborator.shares
                ? `${(props.collaborator.shares / 100) * 328}px`
                : '0px',
              backgroundColor: colors[props.id],
            }}
          />
          {props.isDraggable && <div className="whiteBall" />}
        </div>
        {props.limitToHalf && <div className="bar emptyBar" />}
      </div>
      <div className="shares">
        {!Number.isNaN(props.collaborator.shares) &&
          `${props.collaborator.shares.toFixed(1)} %`}
      </div>
    </div>
  );
};

export default Dragger;
