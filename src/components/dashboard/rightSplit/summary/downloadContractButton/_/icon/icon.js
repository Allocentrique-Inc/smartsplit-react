import { Canvas } from '@react-pdf/renderer';

export default function Icon({ path, size = 128, color = '#2DA84F', style }) {
  const scale = size / 128;
  const paint = (painter) => {
    painter.path(path).scale(scale).fill(color);
  };
  return (
    <Canvas style={[{ height: size, width: size }, style]} paint={paint} />
  );
}
