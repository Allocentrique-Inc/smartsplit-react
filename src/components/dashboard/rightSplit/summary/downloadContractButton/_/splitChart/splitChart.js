import { Canvas } from '@react-pdf/renderer';
import styles from '../styles';
import usePieChartSlices from '../../../../_/charts/usePieChartSlices';
import useChartLogo from '../useChartLogo';

export default function SplitChart({
  chartData,
  logoPath,
  size = 384,
  startAngle,
  ...nextProps
}) {
  const chartCenter = { x: size / 2, y: size / 2 };
  const slices = usePieChartSlices({
    data: chartData,
    clockwise: true,
    size,
    startAngle,
    pdfMode: true,
  });

  const [logoVector, logoScale] = useChartLogo({ size, center: chartCenter });
  const paint = (painter) => {
    painter.lineWidth(1);
    slices.forEach((slice) => {
      if (slice.method === 'path') {
        painter.path(slice.data);
        painter.fill(slice.color);
        painter.path(slice.data);
        painter.stroke('white');
      } else if (slice.method === 'circle') {
        painter.circle(slice.cx, slice.cy, slice.r);
        painter.fill(slice.color);
        painter.circle(slice.cx, slice.cy, slice.r);
        painter.stroke('white');
      }
    });
    painter
      .circle(chartCenter.x, chartCenter.y, size / 4)
      .fill('white')
      .path(logoPath)
      .translate(logoVector.x, logoVector.y)
      .scale(logoScale)
      .fill('#DCDFE1');
  };
  return (
    <Canvas
      style={{ height: size, width: size }}
      paint={paint}
      {...nextProps}
    />
  );
}
