const recalculateShares = ({
  recordingDividingMethod,
  recording,
  label,
  setRecording,
  setLabel,
  isLabelActive,
  activeCollaborators,
}) => {
  if (recordingDividingMethod === 'equal') {
    let splitChanged = false;
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
        if (!splitChanged) {
          splitChanged = collaborator.shares !== oldValue;
        }
      }
    });
    splitChanged && setRecording([...recording]);
    if (isLabelActive) {
      const oldValue = label.shares;
      label.shares =
        Math.floor((100 / activeCollaborators.length) * 10000) / 10000;
      label.shares !== oldValue && setLabel({ ...label });
    }
  }
};
export default recalculateShares;
