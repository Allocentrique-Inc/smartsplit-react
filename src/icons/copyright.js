import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="#2DA84F"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 11a9 9 0 1118 0 9 9 0 01-18 0zm9-11C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zM8.707 13.293a3.243 3.243 0 114.586-4.586 1 1 0 101.414-1.414 5.243 5.243 0 100 7.414 1 1 0 00-1.414-1.414 3.243 3.243 0 01-4.586 0z"
        fill="#2DA84F"
      />
    </svg>
  );
}

export default SvgComponent;
