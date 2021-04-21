const checkLockedShareState = (
  rightHolders,
  setRightHolders,
  lockAll = true,
) => {
  const unlockedShareCount = rightHolders.reduce((count, el) => {
    return count + (el.lock ? 0 : 1);
  }, 0);
  if (rightHolders.length > 1 && lockAll && unlockedShareCount === 1) {
    rightHolders.find((el) => !el.lock).lock = true;
  } else if (rightHolders.length > 1 && !lockAll && unlockedShareCount === 1) {
    rightHolders.forEach((rh) => {
      rh.lock = false;
    });
  } else if (rightHolders.length === 1) {
    rightHolders[0].lock = true;
  }
  setRightHolders([...rightHolders]);
};
export default checkLockedShareState;
