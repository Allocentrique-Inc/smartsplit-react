import Copyright from './copyright/copyright';
import Performance from './performance/performance';
import Recording from './recording/recording';
import Privacy from './privacy/privacy';
import Circle from '../_/circle/circle';

const Consult = (props) => {
  if (!props.workpiece || !props.workpiece.rightSplit || !props.collaborators) {
    return null;
  }
  return (
    <>
      <div className="consultRightSplit">
        <div className="left">
          <Copyright {...props} />
        </div>
        <div className="right">
          {/* <Circle {...props} collaborators={props.copyright} consult /> */}
        </div>
      </div>

      <div className="consultRightSplit">
        <div className="left">
          <Performance {...props} />
        </div>
        <div className="right">
          {/* <Circle {...props} collaborators={props.performance} consult /> */}
        </div>
      </div>

      <div className="consultRightSplit toDo">
        <div className="left">
          <Recording {...props} />
        </div>
        <div className="right" />
      </div>

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
