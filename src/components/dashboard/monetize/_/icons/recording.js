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
        d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM9 6a1 1 0 00-1 1v10a1 1 0 102 0v-3h3a4 4 0 000-8H9zm4 6h-3V8h3a2 2 0 110 4z"
        fill="#8DA0B3"
      />
    </svg>
  );
}

export default SvgComponent;
