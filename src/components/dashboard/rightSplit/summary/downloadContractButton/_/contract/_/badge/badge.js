import { Canvas } from '@react-pdf/renderer';

export default function Badge(props) {
  const { initials, color, size, ...nextProps } = props;
  const center = {
    x: size / 2,
    y: size / 2,
  };
  const paint = (painter) => {
    painter
      .circle(center.x, center.y, size / 2)
      .fill(color)
      .font('Helvetica-Oblique')
      .fontSize(8)
      .fillColor('black')
      .text(initials, center.x - 5, center.y - 3.5);
  };
  return (
    <Canvas
      style={{ height: size, width: size }}
      paint={paint}
      {...nextProps}
    />
  );
}
