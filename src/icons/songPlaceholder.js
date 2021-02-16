import { Colors, Metrics } from '../theme';

export default function SongPlaceholder({
  color = Colors.tertiary,
  size = Metrics.size.medium,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="2" fill="#F5F2F3" />
      <path
        d="M27 11H13C11.8954 11 11 11.8954 11 13V27C11 28.1046 11.8954 29 13 29H27C28.1046 29 29 28.1046 29 27V13C29 11.8954 28.1046 11 27 11Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 18C17.3284 18 18 17.3284 18 16.5C18 15.6716 17.3284 15 16.5 15C15.6716 15 15 15.6716 15 16.5C15 17.3284 15.6716 18 16.5 18Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 23L24 18L13 29"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
