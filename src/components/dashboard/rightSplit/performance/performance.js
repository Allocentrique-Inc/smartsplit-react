import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import Collaborators from './collaborators/collaborators';
import Circle from '../_/circle/circle';

const style = {
  b1: {
    display: 'flex',
    justifyContent: 'center',
  },
  b1b1: {
    width: '944px',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '100px',
    minHeight: 'calc(100vh - 248px)',
  },
  b1b1b1: {
    width: '464px',
  },
  b1b1b2: {
    width: '464px',
  },
  b1b1b2b1: {
    position: 'sticky',
    top: '144px',
    display: 'flex',
    justifyContent: 'space-around',
  },
};

const Performance = (props) => {
  const { workpiece_id } = useParams();
  const addCollaborators = (user_id) => {
    props.setPerformance([
      ...props.performance,
      {
        rightHolder: user_id,
        roles: [],
        comment: '',
        status: '',
        shares: 10,
      },
    ]);
  };
  const deleteCollaborator = (rightHolder) => {
    const arr = [...props.performance];
    arr.splice(
      props.performance.find((el1) => el1.user_id === rightHolder),
      1,
    );
    props.setPerformance(arr);
  };
  const deleteRole = (role, id) => {
    const arr = [...props.performance];
    arr[id].roles = arr[id].roles.filter((el) => el !== role);
    props.setPerformance(arr);
  };
  const addRole = (role, id) => {
    const arr = [...props.performance];
    arr[id].roles.push(role);
    props.setPerformance(arr);
  };

  const commonProps = {
    deleteCollaborator,
    deleteRole,
    addRole,
    addCollaborators,
  };

  props.performance.forEach((el, id, arr) => {
    el.shares = 100 / arr.length;
  });
  return (
    <div>
      <TopBar {...props} />
      <div style={style.b1}>
        <div style={style.b1b1}>
          <div style={style.b1b1b1}>
            <Presentation view="performance" />
            <Collaborators {...props} {...commonProps} />
            <AddCollaborators
              {...props}
              addCollaborators={addCollaborators}
              preSelectedCollaborators={props.performance}
            />
          </div>
          <div style={style.b1b1b2}>
            <div style={style.b1b1b2b1}>
              <Circle {...props} collaborators={props.performance} />
            </div>
          </div>
        </div>
      </div>
      <div />
      <DownBar
        backUrl={`/workpiece/${workpiece_id}/right-split/copyright`}
        frontUrl={`/workpiece/${workpiece_id}/right-split/recording`}
      />
    </div>
  );
};

export default Performance;
