import { vectorOf } from '../../../../../_/charts/utils';

export default function useChartLogo({ size, center }) {
  const logoSize = size / 3;
  const logoCenter = {
    x: logoSize / 2,
    y: logoSize / 2,
  };
  const logoVector = vectorOf(logoCenter, center);
  const scale = logoSize / 128;
  return [logoVector, scale];
}
