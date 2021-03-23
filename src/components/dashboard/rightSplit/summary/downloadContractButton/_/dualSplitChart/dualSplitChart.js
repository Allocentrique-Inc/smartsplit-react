import { Canvas } from '@react-pdf/renderer';
import styles from '../styles';
import useChartLogo from '../useChartLogo';
import { usePieChartSlices } from '../../../../_/charts/hooks';

export default function DualSplitChart({
  leftChartData,
  rightChartData,
  logoPath,
  size = 384,
  leftTitle,
  rightTitle,
  ...nextProps
}) {
  const centerOffset = (size * 32) / 384;
  const chartSize = size - centerOffset;
  const textYpos = chartSize + centerOffset * (7 / 32);
  const chartCenter = { x: size / 2, y: chartSize / 2 };
  const leftSlices = usePieChartSlices({
    data: leftChartData,
    angleRange: 180,
    size: chartSize,
    pdfMode: true,
  });
  const rightSlices = usePieChartSlices({
    data: rightChartData,
    angleRange: 180,
    clockwise: true,
    size: chartSize,
    pdfMode: true,
  });

  const [logoVector, logoScale] = useChartLogo({
    size,
    center: chartCenter,
  });
  const paint = (painter) => {
    painter.lineWidth(1);
    leftSlices.forEach((slice) => {
      painter.path(slice.data);
      painter.fill(slice.color);
      painter.path(slice.data);
      painter.stroke('white');
    });
    painter.translate(centerOffset, 0);
    rightSlices.forEach((slice) => {
      painter.path(slice.data);
      painter.fill(slice.color);
      painter.path(slice.data);
      painter.stroke('white');
    });
    painter
      .translate(-centerOffset, 0)
      .moveTo(size / 2, 0)
      .lineTo(size / 2, chartSize)
      .stroke('#DCDFE1')
      .circle(chartCenter.x, chartCenter.y, chartSize / 4)
      .fill('white')
      .translate(logoVector.x, logoVector.y)
      .path(logoPath)
      .scale(logoScale)
      .fill('#DCDFE1')
      .scale(1 / logoScale)
      .translate(-logoVector.x, -logoVector.y)
      .font('Helvetica-Bold')
      .fontSize(8)
      .fillColor('black')
      .text(leftTitle, chartSize / 2 - 28, textYpos)
      .text(rightTitle, chartSize / 2 + centerOffset, textYpos);
  };
  return (
    <Canvas
      style={{ height: size, width: size }}
      paint={paint}
      {...nextProps}
    />
  );
}
