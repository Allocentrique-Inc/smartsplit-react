import { rightHoldersToChartData } from '../../_/charts/utils';
import useMusicContributors from './useMusicContributors';

export default function computeMusicChartData(
  rightHolders,
  activeCollaboratorsIds,
) {
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
