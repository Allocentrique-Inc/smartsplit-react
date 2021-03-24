const recalculateShares = ({ newDividingMethod, recording }) => {
  if (newDividingMethod === 'equal') {
    const arr = [
      ...recording.map((el) => {
        const arr = { ...el };
        arr.shares = Math.floor((100 / recording.length) * 10000) / 10000;
        return arr;
      }),
    ];
    return arr;
  }
  if (newDividingMethod === 'manual') {
    return [...recording];
  }
};

export default recalculateShares;
