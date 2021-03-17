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
    const author = copyright.reduce(
      (acc, el) => (el.roles.some((el) => el === 'author') ? acc + 1 : acc + 0),
      0,
    );
    const adapter = copyright.reduce(
      (acc, el) =>
        el.roles.some((el) => el === 'adapter') ? acc + 1 : acc + 0,
      0,
    );
    const composer = copyright.reduce(
      (acc, el) =>
        el.roles.some((el) => el === 'composer') ? acc + 1 : acc + 0,
      0,
    );
    const mixer = copyright.reduce(
      (acc, el) => (el.roles.some((el) => el === 'mixer') ? acc + 1 : acc + 0),
      0,
    );

    const authorShares =
      author > 0 ? (adapter + composer + mixer > 0 ? 50 : 100) / author : 0;
    const musicShares =
      adapter + composer + mixer > 0
        ? (author > 0 ? 50 : 100) / (adapter + composer + mixer)
        : 0;
    const arr = [
      ...copyright.map((el) => {
        const obj = { ...el };
        const collAutorShares = el.roles.some((el) => el === 'author')
          ? authorShares
          : 0;
        const collMusicShares =
          el.roles.filter(
            (el) => el === 'adapter' || el === 'composer' || el === 'mixer',
          ).length * musicShares;
        obj.shares =
          Math.floor((collAutorShares + collMusicShares) * 10000) / 10000;
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
