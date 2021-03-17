import usePieChartSlices from '../usePieChartSlices';

export default function PieChart({
  data,
  clockwise,
  size,
  children,
  maxRange,
  startAngle,
}) {
  const slices = data
    ? usePieChartSlices({ data, maxRange, clockwise, size, startAngle })
    : null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {slices}
      {children && <g>{children}</g>}
    </svg>
  );
}
