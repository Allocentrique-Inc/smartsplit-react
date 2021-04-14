import { Colors, Metrics } from '../theme';

export default function Pen({ color = Colors.tertiary, size = 24 }) {
  const scale = size / 24;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3L21 8L8 21H3V16L16 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`scale(${scale})`}
      />
      <path
        d="M13 6L18 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`scale(${scale})`}
      />
    </svg>
  );
}
