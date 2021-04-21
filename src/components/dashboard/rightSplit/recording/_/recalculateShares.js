const recalculateShares = ({
  recordingDividingMethod,
  recording,
  label,
  setRecording,
  setLabel,
}) => {
  const activeCollaborators = recording.filter(
    (collaborator) => collaborator.function !== '',
  );
  const labelIsActive =
    label && label.rightHolder_id && label.agreementDuration !== '';
  labelIsActive && activeCollaborators.push(label);
  if (recordingDividingMethod === 'equal') {
    recording.forEach((collaborator) => {
      if (
        activeCollaborators.some(
          (activeCollaborator) =>
            collaborator.rightHolder_id === activeCollaborator.rightHolder_id,
        )
      ) {
        const oldValue = collaborator.shares;
        collaborator.shares =
          Math.floor((100 / activeCollaborators.length) * 10000) / 10000;
      }
    });
    if (labelIsActive) {
      const oldValue = label.shares;
      label.shares =
        Math.floor((100 / activeCollaborators.length) * 10000) / 10000;
      label.shares !== oldValue && setLabel({ ...label });
    }
  } else if (recordingDividingMethod === 'manual') {
    if (activeCollaborators.length === 1 && labelIsActive) {
      label.shares = 100;
    } else if (activeCollaborators.length === 1 && !labelIsActive) {
      recording.find(
        (el) => el.rightHolder_id === activeCollaborators[0].rightHolder_id,
      ).shares = 100;
    }
  }
  setRecording([...recording]);
  setLabel({ ...label });
};
export default recalculateShares;
