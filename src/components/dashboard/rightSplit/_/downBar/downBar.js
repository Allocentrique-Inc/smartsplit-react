import { Link } from 'react-router-dom';

const style = {
  b1: {
    position: 'sticky',
    bottom: '0px',
    backgroundColor: 'white',
    height: '72px',
    borderBottom: '2px solid #DCDFE1',
    boxShadow: '0px -2px 4px 4px #DCDFE1',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
  },
  b1b1: {
    width: '944px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  b1b1b1: {
    width: '464px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    border: '1px solid #DCDFE1',
    padding: '6px 12px',
    width: 'fit-content',
    borderRadius: '2px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#2DA84F',
  },
  continue: {
    backgroundColor: '#2DA84F',
    color: '#FFFFFF',
  },
  goBack: {
    backgroundColor: '#FFFFFF',
    color: '#2DA84F',
  },
};

const DownBar = (props) => (
  <div style={style.b1}>
    <div style={style.b1b1}>
      <div style={style.b1b1b1}>
        <Link
          to={props.backUrl}
          style={{ ...style.actionButton, ...style.goBack }}
        >
          Retour
        </Link>
        {!props.save && (
          <Link
            to={props.frontUrl}
            style={{ ...style.actionButton, ...style.continue }}
          >
            Continuer
          </Link>
        )}
        {props.save && (
          <button
            onClick={props.save}
            style={{ ...style.actionButton, ...style.continue }}
          >
            Sauvegarder
          </button>
        )}
      </div>
    </div>
  </div>
);

export default DownBar;
