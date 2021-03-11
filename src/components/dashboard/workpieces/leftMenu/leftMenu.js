import { useHistory } from 'react-router-dom';
import Music from '../../../../icons/music';
import SmartsplitSecondary from '../../../../icons/smartsplitSecondary';
import Tool from '../../../../icons/tool';

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

      {/*  <button
        className={`sectionButton ${selected === 'alfa' ? 'alfa' : 'alfa'}`}
        onClick={() => history.push('/settings')}
      >
        <span className="buttonLogo">
          <UserCard />
        </span>
        Mon profil public
      </button> */}
      {/* <button
        className={`sectionButton ${selected === 'alfa' ? 'alfa' : 'alfa'}`}
        onClick={() => history.push('/settings')}
      >
        <span className="buttonLogo">
          <Tool />
        </span>
        Paramètres
      </button> */}
      {/*
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
