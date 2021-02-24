const recalculateShares = ({ newDividingMethod, copyright }) => {
  if (newDividingMethod === 'equal') {
    const arr = [
      ...copyright.map((el) => {
        const arr = { ...el };
        arr.shares = Math.floor((100 / copyright.length) * 10000) / 10000;
        return arr;
      }),
    ];
    return arr;
  }

  if (newDividingMethod === 'role') {
    const autor = copyright.reduce(
      (acc, el) => (el.roles.some((el) => el === 'autor') ? acc + 1 : acc + 0),
      0,
    );
    const adaptator = copyright.reduce(
      (acc, el) =>
        (el.roles.some((el) => el === 'adaptator') ? acc + 1 : acc + 0),
      0,
    );
    const composer = copyright.reduce(
      (acc, el) =>
        (el.roles.some((el) => el === 'composer') ? acc + 1 : acc + 0),
      0,
    );
    const mixer = copyright.reduce(
      (acc, el) => (el.roles.some((el) => el === 'mixer') ? acc + 1 : acc + 0),
      0,
    );

    const autorShares = autor > 0 ? (adaptator + composer + mixer > 0 ? 50 : 100) / autor : 0;
    const musicShares = adaptator + composer + mixer > 0
      ? (autor > 0 ? 50 : 100) / (adaptator + composer + mixer)
      : 0;
    const arr = [
      ...copyright.map((el) => {
        const obj = { ...el };
        const collAutorShares = el.roles.some((el) => el === 'autor')
          ? autorShares
          : 0;
        const collMusicShares = el.roles.filter(
          (el) => el === 'adaptator' || el === 'composer' || el === 'mixer',
        ).length * musicShares;
        obj.shares = Math.floor((collAutorShares + collMusicShares) * 10000) / 10000;
        return obj;
      }),
    ];
    return arr;
  }
  if (newDividingMethod === 'manual') {
    return [...copyright];
  }
};

export default recalculateShares;
