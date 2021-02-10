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

const Recording = (props) => {
  const { workpiece_id } = useParams();
  const addCollaborators = (user_id) => {
    props.setRecording([
      ...props.recording,
      {
        rightHolder: user_id,
        comment: '',
        function: '',
        shares: 10,
      },
    ]);
  };

  const deleteCollaborator = (rightHolder) => {
    const arr = [...props.recording];
    arr.splice(
      props.recording.find((el1) => el1.user_id === rightHolder),
      1,
    );
    props.setRecording(arr);
  };

  const commonProps = {
    addCollaborators,
    deleteCollaborator,
  };

  props.recording.forEach((el, id, arr) => {
    el.shares = 100 / arr.length;
  });

  return (
    <div>
      <TopBar {...props} />
      <div style={style.b1}>
        <div style={style.b1b1}>
          <div style={style.b1b1b1}>
            <Presentation view="recording" />
            <Collaborators {...props} {...commonProps} />
            <AddCollaborators
              {...props}
              {...commonProps}
              preSelectedCollaborators={props.recording}
            />
          </div>
          <div style={style.b1b1b2}>
            <div style={style.b1b1b2b1}>
              <Circle {...props} collaborators={props.recording} />
            </div>
          </div>
        </div>
      </div>
      <DownBar
        backUrl={`/workpiece/${workpiece_id}/right-split/performance`}
        frontUrl={`/workpiece/${workpiece_id}/right-split/privacy`}
      />
    </div>
  );
};

export default Recording;
