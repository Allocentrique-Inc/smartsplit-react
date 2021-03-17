import usePieChartSlices from '../usePieChartSlices';
import PieChart from '../pieChart/pieChart';
import SplitChartLogo from '../splitChartLogo/splitChartLogo';

export default function DualSplitChart({
  leftChartData,
  leftChartTitle,
  rightChartData,
  rightChartTitle,
  logo,
  size = 4 * 128,
}) {
  const containerSize = size + 32;
  const chartCenter = { x: containerSize / 2, y: size / 2 };
  const leftChartCenter = { x: size / 2, y: size / 2 };
  const rightChartCenter = {
    x: size / 2 + 32 * 4,
    y: size / 2,
  };
  const rightSlices = usePieChartSlices({
    data: rightChartData,
    angleRange: 180,
    clockwise: true,
    size,
  });
  const leftSlices = usePieChartSlices({
    data: leftChartData,
    angleRange: 180,
    size,
  });

  return (
    <svg
      width={containerSize}
      height={containerSize}
      viewBox={`0 0 ${containerSize} ${containerSize}`}
      fill="none"
    >
      <g>
        <PieChart size={size}>{leftSlices}</PieChart>
      </g>
      <line
        x1={containerSize / 2}
        y1={0}
        x2={containerSize / 2}
        y2={size}
        stroke="#DCDFE1"
        strokeWidth={1}
      />
      <g transform="translate(32 0)">
        <PieChart size={size}>{rightSlices}</PieChart>
      </g>
      <SplitChartLogo size={size} center={chartCenter} logo={logo} />
      {leftChartTitle && (
        <text
          x={size / 2}
          y={size + 28}
          fill="#203548"
          stroke="#203548"
          style={{ font: 'bold 12 sans-serif' }}
          textAnchor="end"
        >
          {leftChartTitle.toUpperCase()}
        </text>
      )}
      {rightChartTitle && (
        <text
          x={size / 2 + 32}
          y={size + 28}
          fill="#203548"
          stroke="#203548"
          style={{ font: 'bold 12 sans-serif' }}
        >
          {rightChartTitle.toUpperCase()}
        </text>
      )}
    </svg>
  );
}
