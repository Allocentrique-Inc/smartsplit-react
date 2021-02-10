import Title from './title/title';
import Img from './img/img';
import BreadCrumb from './breadCrumb/breadCrumb';
import Credit from './credit/credit';
import SaveAndQuit from './saveAndQuit/saveAndQuit';
import Profile from './profile/profile';

const style = {
  b1: {
    position: 'sticky',
    top: '0px',
    backgroundColor: 'white',
    height: '72px',
    borderBottom: '2px solid #DCDFE1',
    boxShadow: '0px -2px 4px 4px #DCDFE1',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  b1b1: {
    display: 'flex',
    alignItems: 'center',
  },
};
const TopBar = (props) => (
  <div style={style.b1}>
    <div style={style.b1b1}>
      <Img />
      <Title />
      <BreadCrumb />
    </div>
    <div style={style.b1b1}>
      <Credit />
      <SaveAndQuit {...props} />
      <Profile />
    </div>
  </div>
);

export default TopBar;
