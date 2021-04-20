export function useLyricContributors(copyright) {
  const lyricContributors = copyright
    .filter((rh) => rh.roles.includes('author') || rh.roles.includes('adapter'))
    .map((rh) => ({ rightHolder_id: rh.rightHolder_id }));
  const lyricContributorNb = lyricContributors.length;
  return [lyricContributors, lyricContributorNb];
}

export function useMusicContributors(copyright) {
  const musicContributors = copyright
    .filter((rh) => rh.roles.includes('composer') || rh.roles.includes('mixer'))
    .map((rh) => {
      let weight = 0;
      if (rh.roles.includes('composer')) {
        weight += 1;
      }
      if (rh.roles.includes('mixer')) {
        weight += 1;
      }
      return { rightHolder_id: rh.rightHolder_id, weight };
    });
  const musicContributorNb = musicContributors.reduce(
    (n, current) => n + current.weight,
    0,
  );

  return [musicContributors, musicContributorNb];
}
