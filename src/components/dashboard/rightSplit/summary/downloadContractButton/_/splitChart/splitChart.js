import { Canvas } from '@react-pdf/renderer';
import styles from '../styles';

export default function SplitChart({ slices, logoPath, ...nextProps }) {
  const paint = (painter) => {
    painter.lineWidth(1);
    painter.scale(0.5);
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
      .circle(192, 192, 96)
      .fill('white')
      .path(logoPath)
      .translate(128, 128)
      .fill('#DCDFE1');
  };
  return <Canvas style={styles.chart} paint={paint} {...nextProps} />;
}
