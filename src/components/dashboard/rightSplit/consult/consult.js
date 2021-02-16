import Copyright from './copyright/copyright';
import Performance from './performance/performance';
import Recording from './recording/recording';
import Privacy from './privacy/privacy';
import Circle from '../_/circle/circle';

const Consult = (props) => {
  if (!props.workpiece || !props.workpiece.rightSplit || !props.collaborators) {
    return null;
  }
  const recording = [
    props.label.rightHolder_id ? props.label : '',
    ...props.recording,
  ].filter((e) => e !== '');
  return (
    <>
      {props.copyright.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Copyright {...props} />
          </div>
          <div className="right">
            {props.copyright.length > 0 && (
              <Circle {...props} collaborators={props.copyright} consult />
            )}
          </div>
        </div>
      )}

      {props.performance.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Performance {...props} />
          </div>
          <div className="right">
            <Circle {...props} collaborators={props.performance} consult />
          </div>
        </div>
      )}

      {recording.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Recording {...props} />
          </div>
          <div className="right">
            <Circle {...props} collaborators={recording} consult />
          </div>
        </div>
      )}

      <div className="consultRightSplit toDo">
        <div className="left">
          <Privacy {...props} />
        </div>
        <div className="right" />
      </div>
    </>
  );
};

export default Consult;
