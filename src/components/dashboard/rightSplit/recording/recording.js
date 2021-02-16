import { useParams } from 'react-router-dom';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import Label from './label/label';
import Collaborators from './collaborators/collaborators';
import Circle from '../_/circle/circle';

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Recording = (props) => {
  const { workpiece_id } = useParams();
  const addCollaborators = (newCollaborator) => {
    props.setRecording([
      ...props.recording,
      {
        rightHolder: newCollaborator,
        rightHolder_id: newCollaborator.user_id,
        comment: '',
        function: '',
        shares: 0,
      },
    ]);
  };

  const addLabelCollaborators = (newCollaborator) => {
    props.setLabel({
      rightHolder: newCollaborator,
      rightHolder_id: newCollaborator.user_id,
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

  const allActors = [...props.recording];
  if (props.label.rightHolder) {
    allActors.push(props.label);
  }
  const handleDrag = ({ newShares, draggedRightHolder_id }) => {
    const draggedActor = allActors.find(
      (el) => el.rightHolder_id === draggedRightHolder_id,
    );
    if (draggedActor.lock !== true) {
      const draggedDifferential = draggedActor.shares - newShares;
      const notDraggedActors = allActors.filter(
        (el) => el.rightHolder_id !== draggedRightHolder_id,
      );
      const unlockedNotDraggedActors = notDraggedActors.filter(
        (el) => el.lock !== true,
      );
      const unlockedNotDraggedActorsSum = unlockedNotDraggedActors.reduce(
        (acc, el) => el.shares + acc,
        0,
      );
      const totalSum = allActors.reduce((acc, el) => el.shares + acc, 0);
      const sharesToSeparate = unlockedNotDraggedActorsSum + draggedDifferential + 100 - totalSum;
      const redefinedActors = allActors.map((el) => {
        if (el.rightHolder_id === draggedRightHolder_id) {
          el.shares = ceil(
            sharesToSeparate < 0 ? newShares + sharesToSeparate : newShares,
          );
        } else if (el.lock !== true) {
          el.shares = el.shares === 0
            ? 0
            : sharesToSeparate < 0
              ? 0
              : ceil(
                (el.shares / unlockedNotDraggedActorsSum) * sharesToSeparate,
              );
        }
        return el;
      });
      const newRecording = redefinedActors.filter(
        (el) => el.rightHolder_id !== props.label.rightHolder_id,
      );
      const newLabel = redefinedActors.filter(
        (el) => el.rightHolder_id === props.label.rightHolder_id,
      );
      props.setRecording(newRecording);
      if (newLabel.length > 0) {
        props.setLabel(newLabel[0]);
      }
    }
  };

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
              <Circle {...commonProps} collaborators={allActors} />
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
