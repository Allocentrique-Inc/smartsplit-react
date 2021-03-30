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
        d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM9.707 14.293a3.243 3.243 0 114.586-4.586 1 1 0 001.414-1.414 5.243 5.243 0 100 7.414 1 1 0 00-1.414-1.414 3.243 3.243 0 01-4.586 0z"
        fill="#8DA0B3"
      />
    </svg>
  );
}

export default SvgComponent;
