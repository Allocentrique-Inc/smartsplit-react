const recalculateShares = ({ dividingMethod, recording, label }) => {
  const activeCollaborators = recording.filter(
    (collaborator) => collaborator.function !== '',
  );
  const isLabelActive =
    label && label.rightHolder_id && label.agreementDuration !== '';
  isLabelActive && activeCollaborators.push(label);

  if (dividingMethod === 'equal') {
    recording.forEach((collaborator) => {
      activeCollaborators.some(
        (activeCollaborator) =>
          collaborator.rightHolder_id === activeCollaborator.rightHolder_id,
      ) &&
        (collaborator.shares =
          Math.floor((100 / activeCollaborators.length) * 10000) / 10000);
    });
    isLabelActive &&
      (label.shares =
        Math.floor((100 / activeCollaborators.length) * 10000) / 10000);
  }
};

export default recalculateShares;
