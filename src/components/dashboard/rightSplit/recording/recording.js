import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import Label from './label/label';
import Collaborators from './collaborators/collaborators';
import Circle from '../_/circle/circle';

const Recording = (props) => {
  const { workpiece_id } = useParams();
  const addCollaborators = (user_id) => {
    props.setRecording([
      ...props.recording,
      {
        rightHolder: user_id,
        comment: '',
        function: '',
        shares: 0,
      },
    ]);
  };

  const addLabelCollaborators = (user_id) => {
    props.setLabel({
      rightHolder: user_id,
      shares: 0,
      agreementDuration: '',
      notifViaEmail: false,
      notifViaText: false,
    });
  };

  const deleteLabel = () => {
    props.setLabel({});
  };

  const deleteCollaborator = (rightHolder) => {
    const arr = [...props.recording];
    arr.splice(
      props.recording.find((el1) => el1.user_id === rightHolder),
      1,
    );
    props.setRecording(arr);
  };

  const handleDrag = () => {};

  const title = props.translations.rightSplit.title._recording[props.language];
  const textPresentation = props.translations.rightSplit.textPresentation._recording[props.language];
  const textDescription = props.translations.rightSplit.textDescription._recording[props.language];

  const commonProps = {
    ...props,
    addCollaborators,
    deleteCollaborator,
    title,
    textPresentation,
    textDescription,
    handleDrag,
  };

  // props.recording.forEach((el, id, arr) => {
  //   el.shares = 100 / arr.length;
  // });
  return (
    <div className="rightSplitCreation">
      <TopBar {...props} view="recording" />
      <div className="b1">
        <div className="b1b1">
          <div className="b1b1b1">
            <Presentation {...commonProps} />
            {!props.label.rightHolder && (
              <AddCollaborators
                {...props}
                {...commonProps}
                addCollaborators={addLabelCollaborators}
                preSelectedCollaborators={[...props.recording, props.label]}
              />
            )}

            {props.label.rightHolder && (
              <Label
                {...commonProps}
                el={props.label}
                deleteCollaborator={deleteLabel}
              />
            )}
            <div className="separator" />
            <Collaborators {...props} {...commonProps} />
            <AddCollaborators
              {...props}
              {...commonProps}
              preSelectedCollaborators={props.recording}
            />
          </div>
          <div className="b1b1b2">
            <div className="b1b1b1b2">
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
