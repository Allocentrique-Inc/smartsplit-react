const checkLockedShareState = ({
  recording,
  setRecording,
  label,
  setLabel,
  lockAll = true,
}) => {
  const activeCollaborators = recording.filter(
    (collaborator) => collaborator.function !== '',
  );
  const labelIsActive =
    label && label.rightHolder_id && label.agreementDuration !== '';
  labelIsActive && activeCollaborators.push(label);
  const unlockedShareCount = activeCollaborators.reduce((count, el) => {
    return count + (el.lock ? 0 : 1);
  }, 0);

  if (activeCollaborators.length > 1 && lockAll && unlockedShareCount === 1) {
    if (!label.lock && labelIsActive) {
      setLabel({ ...label, lock: true });
    } else {
      recording.find((el) => !el.lock).lock = true;
    }
  } else if (
    activeCollaborators.length > 1 &&
    !lockAll &&
    unlockedShareCount === 1
  ) {
    recording.forEach((rh) => {
      rh.lock = false;
    });
    if (labelIsActive) {
      setLabel({ ...label, lock: false });
    }
  } else if (activeCollaborators.length === 1) {
    if (labelIsActive) {
      setLabel({ ...label, lock: true });
    } else {
      recording.find(
        (el) => el.rightHolder_id === activeCollaborators[0].rightHolder_id,
      ).lock = true;
    }
  }
  setRecording([...recording]);
};
export default checkLockedShareState;
