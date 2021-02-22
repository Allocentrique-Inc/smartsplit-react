import { Metrics } from '../theme';

export default function ProfilePlaceholder({ size = Metrics.size.medium }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#DCDFE1" />
      <path
        d="M16.7918 26L15.9918 23.344H12.2638L11.4638 26H8.99976L12.6798 14.832H15.6878L19.3198 26H16.7918ZM14.1518 17.04H14.0718L12.8398 21.28H15.3998L14.1518 17.04Z"
        fill="#687A8B"
      />
      <path
        d="M27.9011 26L27.1011 23.344H23.3731L22.5731 26H20.1091L23.7891 14.832H26.7971L30.4291 26H27.9011ZM25.2611 17.04H25.1811L23.9491 21.28H26.5091L25.2611 17.04Z"
        fill="#687A8B"
      />
    </svg>
  );
}
