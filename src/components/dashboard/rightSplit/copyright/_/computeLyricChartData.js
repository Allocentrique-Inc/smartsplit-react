import { rightHoldersToChartData } from '../../_/charts/utils';
import useLyricContributors from './useLyricContributors';

export default function computeLyricChartData(
  rightHolders,
  activeCollaboratorsIds,
) {
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
