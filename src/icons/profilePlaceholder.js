import { Metrics } from '../theme';

export default function ProfilePlaceholder({ small }) {
  return !small ? (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
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
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#DCDFE1" />
      <path
        d="M10.0749 15.6002L9.59486 14.0066H7.35806L6.87806 15.6002H5.39966L7.60766 8.89941H9.41246L11.5917 15.6002H10.0749ZM8.49086 10.2242H8.44286L7.70366 12.7682H9.23966L8.49086 10.2242Z"
        fill="#687A8B"
      />
      <path
        d="M16.7405 15.6002L16.2605 14.0066H14.0237L13.5437 15.6002H12.0653L14.2733 8.89941H16.0781L18.2573 15.6002H16.7405ZM15.1565 10.2242H15.1085L14.3693 12.7682H15.9053L15.1565 10.2242Z"
        fill="#687A8B"
      />
    </svg>
  );
}
