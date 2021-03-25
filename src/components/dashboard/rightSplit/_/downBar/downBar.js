import { useHistory } from 'react-router-dom';

const DownBar = (props) => {
  const history = useHistory();
  const handleNext = () => {
    console.log(props.errors);
    props.setTriedSubmit(true);
    if (props.errors.length === 0) {
      history.push(props.frontUrl);
    }
  };
  const handleBack = () => {
    history.push(props.backUrl);
  };
  return (
    <div className="downBar">
      <div className="b1b1">
        <div className="b1b1b1">
          {props.backUrl ? (
            <button onClick={handleBack} className="btn-secondary">
              Retour
            </button>
          ) : (
            <div />
          )}

          {!props.save && (
            <button onClick={handleNext} className="btn-primary">
              Continuer
            </button>
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
};

export default DownBar;
