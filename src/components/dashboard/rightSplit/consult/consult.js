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
    props.rightSplitInConsultation.label.rightHolder_id
      ? props.rightSplitInConsultation.label
      : '',
    ...props.rightSplitInConsultation.recording,
  ].filter((e) => e !== '');

  let activeCollaborators = [
    ...props.rightSplitInConsultation.copyright,
    ...props.rightSplitInConsultation.performance,
    ...props.rightSplitInConsultation.recording,
  ];
  if (props.rightSplitInConsultation.label.rightHolder_id) {
    activeCollaborators.push(props.rightSplitInConsultation.label);
  }
  activeCollaborators = activeCollaborators.reduce((acc, el) => {
    if (acc.find((EL) => EL.rightHolder_id === el.rightHolder_id)) {
      return acc;
    }
    return [...acc, el];
  }, []);
  const activeCollaboratorsIds = activeCollaborators.map(
    (el) => el.rightHolder_id,
  );

  const commonProps = {
    ...props,
    activeCollaboratorsIds,
  };
  return (
    <>
      {props.rightSplitInConsultation.copyright.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Copyright {...commonProps} />
          </div>
          <div className="consultRightSplitRight">
            {props.rightSplitInConsultation.copyright.length > 0 && (
              <Circle
                {...commonProps}
                collaborators={props.rightSplitInConsultation.copyright}
                consult
              />
            )}
          </div>
        </div>
      )}

      {props.rightSplitInConsultation.performance.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Performance {...commonProps} />
          </div>
          <div className="consultRightSplitRight">
            <Circle
              {...commonProps}
              collaborators={props.rightSplitInConsultation.performance}
              consult
            />
          </div>
        </div>
      )}

      {recording.length > 0 && (
        <div className="consultRightSplit">
          <div className="left">
            <Recording {...commonProps} />
          </div>
          <div className="consultRightSplitRight">
            <Circle {...commonProps} collaborators={recording} consult />
          </div>
        </div>
      )}

      <div className="consultRightSplit">
        <div className="left">
          <Privacy {...commonProps} />
        </div>
        <div className="consultRightSplitRight" />
      </div>
    </>
  );
};

export default Consult;
