import { Link } from 'react-router-dom';
import ArrowLeft from '../../../../../icons/arrowLeft';

export default function MobileTopBar({
  language,
  updateUser,
  noShadow,
  children,
}) {
  const t_button = {
    fr: 'Sauvegarder',
    en: 'Save',
  }[language];
  return (
    <div className={`mobileTopBar${noShadow ? ' noShadow' : ''}`}>
      <div className="row">
        <Link to="/settings">
          <ArrowLeft />
        </Link>
        <h2>{children}</h2>
      </div>
      <button className="btn-secondary" onClick={updateUser}>
        {t_button}
      </button>
    </div>
  );
}
