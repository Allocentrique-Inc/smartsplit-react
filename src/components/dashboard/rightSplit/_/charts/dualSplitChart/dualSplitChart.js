import PieChart from '../pieChart/pieChart';
import SplitChartLogo from '../splitChartLogo/splitChartLogo';
import { usePieChartSlices } from '../hooks';

export default function DualSplitChart({
  leftChartData,
  leftChartTitle,
  rightChartData,
  rightChartTitle,
  logo,
  size = 384,
}) {
  const centerOffset = (size * 32) / 384;
  const chartSize = size - centerOffset;
  const fontSize = (size * 16) / 384;
  const textYpos = chartSize + centerOffset * (28 / 32);
  const chartCenter = { x: size / 2, y: chartSize / 2 };
  const rightSlices = usePieChartSlices({
    data: rightChartData,
    angleRange: 180,
    clockwise: true,
    size: chartSize,
  });
  const leftSlices = usePieChartSlices({
    data: leftChartData,
    angleRange: 180,
    size: chartSize,
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <g>
        <PieChart size={size}>{leftSlices}</PieChart>
      </g>
      <line
        x1={size / 2}
        y1={0}
        x2={size / 2}
        y2={chartSize}
        stroke="#DCDFE1"
        strokeWidth={1}
      />
      <g transform={`translate(${centerOffset} 0)`}>
        <PieChart size={size}>{rightSlices}</PieChart>
      </g>
      <SplitChartLogo size={size} center={chartCenter} logo={logo} />
      {leftChartTitle && (
        <text
          x={chartSize / 2}
          y={textYpos}
          fill="#203548"
          stroke="#203548"
          style={{ font: `normal ${fontSize}px sans-serif` }}
          textAnchor="end"
        >
          {leftChartTitle.toUpperCase()}
        </text>
      )}
      {rightChartTitle && (
        <text
          x={chartSize / 2 + centerOffset}
          y={textYpos}
          fill="#203548"
          stroke="#203548"
          style={{ font: `normal ${fontSize}px sans-serif` }}
        >
          {rightChartTitle.toUpperCase()}
        </text>
      )}
    </svg>
  );
}
