import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AddCollaborators from '../_/addCollaborators/addCollaborators';
import TopBar from '../_/topBar/topBar';
import DownBar from '../_/downBar/downBar';
import Presentation from '../_/presentation/presentation';
import Label from './label/label';
import Collaborator from './collaborator/collaborator';
import Circle from '../_/circle/circle';
import CreateNewCollaborator from '../_/createNewCollaborator/createNewCollaborator';
import PageErrors from '../../_/pageErrors/pageErrors';
import setCollaboratorsErrors from './_/setCollaboratorsErrors';
import setLabelErrors from './_/setLabelErrors';

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Recording = (props) => {
  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [
    isCreatingNewLabelCollaborator,
    setIsCreatingNewLabelCollaborator,
  ] = useState(false);
  const { workpiece_id } = useParams();

  const pageErrors = props.calculateRecordingErrors(
    props.recording,
    props.label,
  );

  const addCollaborators = (newCollaborator) => {
    const isCollaboratorAlreadyIn = props.recording.find(
      (el) => newCollaborator.user_id === el.rightHolder_id,
    );
    if (!isCollaboratorAlreadyIn) {
      let newRecording = [
        ...props.recording,
        {
          rightHolder: newCollaborator,
          rightHolder_id: newCollaborator.user_id,
          comment: '',
          function: '',
          shares: 0,
        },
      ];
      newRecording = setCollaboratorsErrors(newRecording);
      props.setRecording(newRecording);
    }
  };

  const addLabelCollaborators = (newCollaborator) => {
    let newLabelCollaborator = {
      rightHolder: newCollaborator,
      rightHolder_id: newCollaborator.user_id,
      shares: 0,
      agreementDuration: '',
      notifViaEmail: false,
      notifViaText: false,
    };
    newLabelCollaborator = setLabelErrors(newLabelCollaborator);
    props.setLabel(newLabelCollaborator);
  };

  const deleteLabel = () => {
    props.setLabel({});
  };

  const deleteCollaborator = (rightHolder) => {
    let newRecording = [...props.recording];
    newRecording.splice(
      props.recording.find((el1) => el1.user_id === rightHolder),
      1,
    );
    newRecording = setCollaboratorsErrors(newRecording);
    props.setRecording(newRecording);
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
      const sharesToSeparate =
        unlockedNotDraggedActorsSum + draggedDifferential + 100 - totalSum;
      const redefinedActors = allActors.map((el) => {
        if (el.rightHolder_id === draggedRightHolder_id) {
          el.shares = ceil(
            sharesToSeparate < 0 ? newShares + sharesToSeparate : newShares,
          );
        } else if (el.lock !== true) {
          el.shares =
            el.shares === 0
              ? 0
              : sharesToSeparate < 0
                ? 0
                : ceil(
                  (el.shares / unlockedNotDraggedActorsSum) * sharesToSeparate,
                );
        }
        return el;
      });
      let newRecording = redefinedActors.filter(
        (el) => el.rightHolder_id !== props.label.rightHolder_id,
      );
      let newLabel = redefinedActors.filter(
        (el) => el.rightHolder_id === props.label.rightHolder_id,
      );
      newRecording = setCollaboratorsErrors(newRecording);
      newLabel = setLabelErrors(newLabel);
      props.setRecording(newRecording);
      if (newLabel.length > 0) {
        props.setLabel(newLabel[0]);
      }
    }
  };

  const allActorsSum = allActors.reduce((acc, el) => el.shares + acc, 0);
  const isDisplayingCircle = allActorsSum === 100;

  const t_title =
    props.translations.rightSplit.title._recording[props.language];
  const t_presentation =
    props.translations.rightSplit.presentation._recording[props.language];
  const t_description =
    props.translations.rightSplit.description._recording[props.language];

  const commonProps = {
    ...props,
    addCollaborators,
    deleteCollaborator,
    t_title,
    t_presentation,
    t_description,
    handleDrag,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
    isCreatingNewLabelCollaborator,
    setIsCreatingNewLabelCollaborator,
    triedSubmit,
    setTriedSubmit,
  };
  return (
    <>
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      {isCreatingNewLabelCollaborator && (
        <CreateNewCollaborator
          {...commonProps}
          addCollaborators={addLabelCollaborators}
          setIsCreatingNewCollaborator={setIsCreatingNewLabelCollaborator}
        />
      )}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="recording" errors={pageErrors} />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} view="recording" />
              {!props.label.rightHolder && (
                <AddCollaborators
                  {...commonProps}
                  addCollaborators={addLabelCollaborators}
                  preSelectedCollaborators={[...props.recording, props.label]}
                  setIsCreatingNewCollaborator={
                    setIsCreatingNewLabelCollaborator
                  }
                  isAddingLabel
                />
              )}
              {props.label.rightHolder && (
                <Label
                  {...commonProps}
                  collaborator={props.label}
                  deleteCollaborator={deleteLabel}
                />
              )}

              <div className="separator" />

              {props.recording.map((collaborator, id) => (
                <Collaborator
                  key={collaborator.rightHolder_id}
                  {...commonProps}
                  collaborator={collaborator}
                  id={id}
                />
              ))}

              <AddCollaborators
                {...commonProps}
                preSelectedCollaborators={allActors}
              />

              {triedSubmit && (
                <PageErrors {...commonProps} errors={pageErrors} />
              )}
            </div>
            <div className="b1b1b2">
              <div className="b1b1b1b2">
                {isDisplayingCircle && (
                  <Circle {...commonProps} collaborators={allActors} />
                )}
              </div>
            </div>
          </div>
        </div>
        <DownBar
          {...commonProps}
          errors={pageErrors}
          backUrl={`/workpiece/${workpiece_id}/right-split/performance`}
          frontUrl={`/workpiece/${workpiece_id}/right-split/privacy`}
        />
      </div>
    </>
  );
};

export default Recording;
