import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import checkLockedShareState from './_/checkLockedShareState';

const ceil = (el) => Math.floor(el * 10000) / 10000;

const Recording = (props) => {
  const {
    activeCollaboratorIds,
    recording,
    setRecording,
    recordingDividingMethod,
    selectRecordingDividingMethod,
    calculateRecordingErrors,
    label,
    setLabel,
    translations,
    language,
  } = props;

  const activeCollaborators = recording.filter(
    (collaborator) => collaborator.function !== '',
  );
  const labelIsActive =
    label && label.rightHolder_id && label.agreementDuration !== '';
  labelIsActive && activeCollaborators.push(label);

  useEffect(() => {
    checkLockedShareState({
      recording,
      setRecording,
      label,
      setLabel,
      lockAll: false,
    });
  }, [activeCollaborators.length, recordingDividingMethod]);

  const [isCreatingNewCollaborator, setIsCreatingNewCollaborator] = useState(
    false,
  );
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [
    isCreatingNewLabelCollaborator,
    setIsCreatingNewLabelCollaborator,
  ] = useState(false);
  const { workpiece_id } = useParams();
  const pageErrors = calculateRecordingErrors(recording, label);

  const addCollaborators = (newCollaborator) => {
    const isCollaboratorAlreadyIn = recording.find(
      (el) => newCollaborator.user_id === el.rightHolder_id,
    );
    if (!isCollaboratorAlreadyIn) {
      recording.push({
        rightHolder: newCollaborator,
        rightHolder_id: newCollaborator.user_id,
        comment: '',
        function: '',
        shares: 0,
      });
      setCollaboratorsErrors(recording);
      setRecording([...recording]);
    }
  };

  const setLabelAgreementDuration = (newValue) => {
    label.agreementDuration = newValue;
    setLabelErrors(label);
    setLabel({ ...label });
  };

  const setCollaboratorFunction = (newValue, rightHolder_id) => {
    const collaboratorIndex = recording.findIndex(
      (el) => el.rightHolder_id === rightHolder_id,
    );
    recording[collaboratorIndex].function = newValue;
    setCollaboratorsErrors(recording);
    setRecording([...recording]);
  };

  const addLabel = (newCollaborator) => {
    const newLabelCollaborator = {
      rightHolder: newCollaborator,
      rightHolder_id: newCollaborator.user_id,
      shares: 0,
      agreementDuration: '',
      notifViaEmail: false,
      notifViaText: false,
    };
    setLabelErrors(newLabelCollaborator);
    setLabel(newLabelCollaborator);
  };

  const deleteLabel = () => {
    recalculateShares({
      recording,
      setRecording,
      label: {},
      setLabel,
      recordingDividingMethod,
    });
  };

  const deleteCollaborator = (rightHolder) => {
    recording.splice(
      recording.find((el1) => el1.user_id === rightHolder),
      1,
    );
    setCollaboratorsErrors(recording);
    recalculateShares({
      recording,
      setRecording,
      label,
      setLabel,
      recordingDividingMethod,
    });
  };

  const allActors = recording.filter((actor) => actor.function !== '');
  if (label.rightHolder) {
    allActors.push(label);
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
      const newRecording = redefinedActors.filter(
        (el) => el.rightHolder_id !== label.rightHolder_id,
      );
      const newLabel = redefinedActors.filter(
        (el) => el.rightHolder_id === label.rightHolder_id,
      );
      setCollaboratorsErrors(newRecording);
      setLabelErrors(newLabel);
      setRecording(newRecording);
      if (newLabel.length > 0) {
        setLabel(newLabel[0]);
      }
    }
  };

  const handleSelectDividingMethod = (dividingMethod) => {
    setCollaboratorsErrors(recording);
    setRecording([...recording]);
    selectRecordingDividingMethod(dividingMethod);
  };

  const allActorsSum = allActors.reduce((acc, el) => el.shares + acc, 0);
  const isDisplayingCircle = allActorsSum > 99.999 && allActorsSum < 100.001;

  const t_title = translations.rightSplit.title._recording[language];
  const t_presentation =
    translations.rightSplit.presentation._recording[language];
  const t_description =
    translations.rightSplit.description._recording[language];
  const commonProps = {
    ...props,
    activeCollaboratorIds,
    activeCollaborators,
    labelIsActive,
    recording,
    setRecording,
    recordingDividingMethod,
    selectRecordingDividingMethod,
    calculateRecordingErrors,
    label,
    setLabel,
    translations,
    language,
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
      [...recording, label],
      activeCollaboratorIds,
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

              {!label.rightHolder && (
                <AddCollaborators
                  {...commonProps}
                  addCollaborators={addLabel}
                  preSelectedCollaborators={[...recording, label]}
                  setIsCreatingNewCollaborator={
                    setIsCreatingNewLabelCollaborator
                  }
                  isAddingLabel
                />
              )}
              {label.rightHolder && (
                <Label {...commonProps} deleteLabel={deleteLabel} />
              )}

              <div className="separator" />

              {recording.map((collaborator, id) => (
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

            {!props.isMobile && (
              <div className="b1b1b2">
                <div className="b1b1b1b2">
                  {isDisplayingCircle && <SplitChart {...commonProps} />}
                </div>
              </div>
            )}
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
