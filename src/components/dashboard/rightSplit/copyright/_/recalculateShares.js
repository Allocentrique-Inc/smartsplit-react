import { useLyricContributors, useMusicContributors } from './hooks';

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
    const [lyricContributors, lyricContributorNb] = useLyricContributors(
      copyright,
    );
    const [musicContributors, musicContributorNb] = useMusicContributors(
      copyright,
    );
    let totalFactor = 0.5;
    if (lyricContributorNb === 0 || musicContributorNb === 0) {
      totalFactor = 1;
    }
    return copyright.map((rh) => {
      let score = 0;
      if (
        lyricContributors.some(
          (contributor) => contributor.rightHolder_id === rh.rightHolder_id,
        )
      ) {
        score += (totalFactor * copyright.length) / lyricContributorNb;
      }
      musicContributors.forEach((contributor) => {
        if (contributor.rightHolder_id === rh.rightHolder_id) {
          score +=
            (totalFactor * contributor.weight * copyright.length) /
            musicContributorNb;
        }
      });

      rh.shares =
        Math.floor(((score * 100) / copyright.length) * 10000) / 10000;
      return rh;
    });
  }
  if (newDividingMethod === 'manual') {
    return [...copyright];
  }
};

export default recalculateShares;
