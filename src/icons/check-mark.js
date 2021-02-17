import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      width={10}
      height={7}
      viewBox="0 0 18 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 1L6 12 1 7"
        stroke="#ffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
