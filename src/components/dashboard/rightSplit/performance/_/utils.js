import {
  useMajorContributors,
  useMinorContributors,
} from '../../recording/_/hooks';

export function computeDividingMethod(rightHolders) {
  const majorShares = useMajorContributors(rightHolders);
  const minorShares = useMinorContributors(rightHolders);
  if (
    (majorShares.length > 0 && minorShares.length === 0) ||
    (majorShares.length === 0 && minorShares.length > 0)
  ) {
    return 'equal';
  }
  if (majorShares.length > 0 && minorShares.length > 0) {
    return '80-20';
  }
  return null;
}
