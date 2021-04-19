import { rightHoldersToChartData } from '../../_/charts/utils';
import { useLyricContributors, useMusicContributors } from './hooks';

export function computeLyricChartData(rightHolders, activeCollaboratorsIds) {
  const [lyricContributors, lyricContributorsNb] = useLyricContributors(
    rightHolders,
  );
  return rightHoldersToChartData(
    lyricContributors.map((contributor) => ({
      ...contributor,
      shares: Math.floor((100 / lyricContributorsNb) * 10000) * 10000,
    })),
    activeCollaboratorsIds,
  );
}

export function computeMusicChartData(rightHolders, activeCollaboratorsIds) {
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
    activeCollaboratorsIds,
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
