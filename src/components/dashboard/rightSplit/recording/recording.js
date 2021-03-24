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
import PageErrors from '../_/pageErrors/pageErrors';
import setCollaboratorsErrors from './_/setCollaboratorsErrors';
import setLabelErrors from './_/setLabelErrors';
import CircledP from '../../../../icons/circledP';
import SplitChart from '../_/charts/splitChart/splitChart';
import { rightHoldersToChartData } from '../_/charts/utils';
import DividingMethod from './dividingMethod/dividingMethod';
import recalculateShares from './_/recalculateShares';

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Recording = (props) => {
  console.log('RECORDING PROPS', props);
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
      props.recording.push({
        rightHolder: newCollaborator,
        rightHolder_id: newCollaborator.user_id,
        comment: '',
        function: '',
        shares: 0,
      });
      recalculateShares({
        dividingMethod: props.recordingDividingMethod,
        recording: props.recording,
        label: props.label,
      });
      const newRecording = setCollaboratorsErrors(props.recording);
      props.setRecording(newRecording);
    }
  };

  const setLabelAgreementDuration = (newValue) => {
    props.label.agreementDuration = newValue;
    console.log('LABEL', props.label);
    const label = setLabelErrors(props.label);
    props.setLabel(label);
    recalculateShares({
      dividingMethod: props.recordingDividingMethod,
      recording: props.recording,
      label,
    });
  };

  const setCollaboratorFunction = (newValue, rightHolder_id) => {
    props.recording.find(
      (el) => el.rightHolder_id === rightHolder_id,
    ).function = newValue;
    recalculateShares({
      dividingMethod: props.recordingDividingMethod,
      recording: props.recording,
      label: props.label,
    });
    const newRecording = setCollaboratorsErrors(props.recording);
    props.setRecording(newRecording);
  };

  const addLabel = (newCollaborator) => {
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
    // recalculateShares({
    //   dividingMethod: props.recordingDividingMethod,
    //   recording: props.recording,
    // });
    // props.setRecording(props.recording);
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

  const allActors = props.recording.filter((actor) => actor.function !== '');
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

  const handleSelectDividingMethod = (dividingMethod) => {
    recalculateShares({
      dividingMethod,
      recording: props.recording,
      label: props.label,
    });

    const newRecording = setCollaboratorsErrors(props.recording);
    props.setRecording(newRecording);
    props.selectRecordingDividingMethod(dividingMethod);
  };

  const allActorsSum = allActors.reduce((acc, el) => el.shares + acc, 0);
  const isDisplayingCircle = allActorsSum > 99.999 && allActorsSum < 100.001;

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
    handleSelectDividingMethod,
    setCollaboratorFunction,
    setLabelAgreementDuration,
    isCreatingNewCollaborator,
    setIsCreatingNewCollaborator,
    isCreatingNewLabelCollaborator,
    setIsCreatingNewLabelCollaborator,
    triedSubmit,
    setTriedSubmit,
    chartData: rightHoldersToChartData(
      [...props.recording, props.label],
      props.activeCollaboratorsIds,
    ),
    logo: CircledP,
    size: 384,
  };
  return (
    <>
      {isCreatingNewCollaborator && <CreateNewCollaborator {...commonProps} />}
      {isCreatingNewLabelCollaborator && (
        <CreateNewCollaborator
          {...commonProps}
          addCollaborators={addLabel}
          setIsCreatingNewCollaborator={setIsCreatingNewLabelCollaborator}
        />
      )}
      <div className="rightSplitCreation">
        <TopBar {...commonProps} view="recording" errors={pageErrors} />
        <div className="b1">
          <div className="b1b1">
            <div className="b1b1b1">
              <Presentation {...commonProps} view="recording" />
              <DividingMethod {...commonProps} />

              {!props.label.rightHolder && (
                <AddCollaborators
                  {...commonProps}
                  addCollaborators={addLabel}
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
                  deleteLabel={deleteLabel}
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
                {isDisplayingCircle && <SplitChart {...commonProps} />}
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
