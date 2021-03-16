import usePieChartSlices from '../usePieChartSlices';
import PieChart from '../pieChart/pieChart';
import SplitChartLogo from '../splitChartLogo/splitChartLogo';
import { rightHoldersToChartData } from '../utils';

export default function SplitChart({
  chartData,
  activeCollaboratorsIds,
  logo,
  size = 4 * 128,
  startAngle,
}) {
  const chartCenter = { x: size / 2, y: size / 2 };
  const slices = usePieChartSlices({
    data: chartData,
    clockwise: true,
    size,
    startAngle,
  });
  return (
    <PieChart size={size}>
      {slices}
      <SplitChartLogo size={size} center={chartCenter} logo={logo} />
    </PieChart>
  );
}
