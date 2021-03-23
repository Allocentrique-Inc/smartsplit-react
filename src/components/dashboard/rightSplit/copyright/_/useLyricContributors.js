export default function useLyricContributors(copyright) {
  const lyricContributors = copyright
    .filter((rh) => rh.roles.includes('author') || rh.roles.includes('adapter'))
    .map((rh) => ({ rightHolder_id: rh.rightHolder_id }));
  const lyricContributorNb = lyricContributors.length;
  return [lyricContributors, lyricContributorNb];
}
