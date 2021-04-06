import { Link } from 'react-router-dom';
import ArrowLeft from '../../../../icons/arrowLeft';

export default function MobileTopBar({ backLink, noShadow, action, children }) {
  return (
    <div className={`mobileTopBar${noShadow ? ' noShadow' : ''}`}>
      <div className="row">
        <Link to={backLink}>
          <ArrowLeft />
        </Link>
        <h2>{children}</h2>
      </div>
      {action}
    </div>
  );
}
