import { Link } from 'react-router-dom';

const DownBar = (props) => (
  <div className="downBar">
    <div className="b1b1">
      <div className="b1b1b1">
        <Link to={props.backUrl} className="btn-secondary">
          Retour
        </Link>
        {!props.save && (
          <Link to={props.frontUrl} className="btn-primary">
            Continuer
          </Link>
        )}
        {props.save && (
          <button onClick={props.save} className="btn-primary">
            Sauvegarder
          </button>
        )}
      </div>
    </div>
  </div>
);

export default DownBar;
