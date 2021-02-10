import SectionTitle from '../_/sectionTitle/sectionTitle';
// import Collaborator from "../_/collaborator/collaborator"
import Modify from '../_/modify/modify';

const style = {
  b1: {
    border: '1px solid black',
    padding: '10px',
    margin: '10px',
  },
};
const Recording = (props) => (
  <div style={style.b1}>
    <SectionTitle value="Privacy" />
    <Modify {...props} destination="privacy" />
    <div style={{ color: 'red' }}>TODO</div>
  </div>
);

export default Recording;
