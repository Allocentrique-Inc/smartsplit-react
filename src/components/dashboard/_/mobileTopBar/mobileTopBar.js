import { Link } from 'react-router-dom';
import ArrowLeft from '../../../../icons/arrowLeft';

export default function MobileTopBar({ back, noShadow, action, children }) {
  return (
    <div className={`mobileTopBar${noShadow ? ' noShadow' : ''}`}>
      <div className="row">
        <button className="btn-icon" onClick={back}>
          <ArrowLeft />
        </button>
        <h2>{children}</h2>
      </div>
      {action}
    </div>
  );
}
