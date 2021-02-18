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
        d="M3 12a9 9 0 1118 0 9 9 0 01-18 0zm9-11C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.444 5.52a.5.5 0 00-.888 0L9.975 9.583l-3.544.495a.5.5 0 00-.272.861l2.55 2.375-.6 3.349a.5.5 0 00.717.535L12 15.6l3.174 1.596a.5.5 0 00.717-.535l-.6-3.35 2.55-2.374a.5.5 0 00-.272-.86l-3.544-.496-1.58-3.061z"
        fill="#2DA84F"
      />
    </svg>
  );
}

export default SvgComponent;
