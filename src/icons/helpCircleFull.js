import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-5.125a1 1 0 011 1V17a1 1 0 11-2 0v-.125a1 1 0 011-1zm-1.093-7.604A2 2 0 0113.92 10V10c0 .47-.365.958-1.055 1.418a6.046 6.046 0 01-1.246.628l-.016.006a1 1 0 00.633 1.897l.063-.022-.061.021h.001l.004-.002.011-.003.035-.012.01-.004.106-.04a8.036 8.036 0 001.57-.806c.81-.539 1.945-1.55 1.945-3.08a4 4 0 00-7.773-1.333 1 1 0 101.886.664 2 2 0 01.874-1.06z"
        fill="#8DA0B3"
      />
    </svg>
  );
}

export default SvgComponent;
