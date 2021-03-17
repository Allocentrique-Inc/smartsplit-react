import { lightenDarkenColor } from '../utils';

export default function PieChartSlice(props) {
  const {
    start,
    end,
    center,
    radius,
    angle,
    rotation = 0,
    clockwise,
    color,
    focus,
    ...nextProps
  } = props;
  return 2 * Math.PI - Math.abs(angle) < 0.00000001 ? (
    <circle
      cx={center.x}
      cy={center.y}
      r={radius}
      fill={focus ? lightenDarkenColor(color, 10) : color}
      {...nextProps}
    />
  ) : (
    <path
      d={`M${center.x},${center.y} L${start.x},${
        start.y
      } A${radius},${radius} ${rotation} ${Math.abs(angle) > Math.PI ? 1 : 0},${
        clockwise ? 1 : 0
      } ${end.x},${end.y} z`}
      fill={focus ? lightenDarkenColor(color, 10) : color}
      stroke="white"
      strokeWidth="1"
      {...nextProps}
    />
  );
}
