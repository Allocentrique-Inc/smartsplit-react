import { useHistory } from 'react-router-dom';
import Music from '../../../../icons/music';
import SmartsplitSecondary from '../../../../icons/smartsplitSecondary';

const LeftMenu = (props) => {
  const history = useHistory();
  const selected = 'alfa';
  return (
    <div className="leftMenu">
      <div className="logo">
        <SmartsplitSecondary />
      </div>
      <button
        className="sectionButton  selected"
        onClick={() => history.push('/')}
      >
        <span className="buttonLogo">
          <Music />
        </span>
        Mes pièces musicales
      </button>

      {/* <button
        className={`sectionButton ${selected === 'alfa' ? 'alfa' : 'alfa'}`}
        onClick={() => history.push('/profile')}
      >
        <span className="buttonLogo" />
        Mon profil public
      </button>
      <button
        className={`sectionButton ${selected === 'alfa' ? 'alfa' : 'alfa'}`}
        onClick={() => history.push('/collaborators')}
      >
        <span className="buttonLogo" />
        Mes collaborateurs
      </button>
      <button
        className={`sectionButton ${selected === 'alfa' ? 'alfa' : 'alfa'}`}
        onClick={() => history.push('/revenues')}
      >
        <span className="buttonLogo" />
        Mes revenues
      </button> */}
    </div>
  );
};

export default LeftMenu;
