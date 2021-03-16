import { createElement } from 'react';
import { vectorOf } from '../utils';

export default function SplitChartLogo({ size, center, logo }) {
  if (!logo) return null;
  const logoSize = size / 3;
  const logoCenter = {
    x: logoSize / 2,
    y: logoSize / 2,
  };
  const logoVector = vectorOf(logoCenter, center);
  const scale = logoSize / 128;
  return (
    <>
      <circle cx={center.x} cy={center.y} r={size / 4} fill="#FFFFFF" />
      <g scale={scale} transform={`translate(${logoVector.x} ${logoVector.y})`}>
        {createElement(logo)}
      </g>
    </>
  );
}
