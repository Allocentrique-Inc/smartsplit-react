import { rightHoldersToChartData } from '../../_/charts/utils';
import { useLyricContributors, useMusicContributors } from './hooks';

export function computeLyricChartData(rightHolders, activeCollaboratorIds) {
  const [lyricContributors, lyricContributorsNb] = useLyricContributors(
    rightHolders,
  );
  return rightHoldersToChartData(
    lyricContributors.map((contributor) => ({
      ...contributor,
      shares: Math.floor((100 / lyricContributorsNb) * 10000) * 10000,
    })),
    activeCollaboratorIds,
  );
}

export function computeMusicChartData(rightHolders, activeCollaboratorIds) {
  const [musicContributors, musicContributorNb] = useMusicContributors(
    rightHolders,
  );

  return rightHoldersToChartData(
    musicContributors.map((contributor) => ({
      ...contributor,
      shares:
        Math.floor(((contributor.weight * 100) / musicContributorNb) * 10000) *
        10000,
    })),
    activeCollaboratorIds,
  );
}

export function showDualPieChart(rightHolders, dividingMethod) {
  const musicContributorNb = useMusicContributors(rightHolders)[1];
  const lyricContributorNb = useLyricContributors(rightHolders)[1];
  return (
    musicContributorNb > 0 &&
    lyricContributorNb > 0 &&
    dividingMethod === 'role'
  );
}
