import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      width={56}
      height={56}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M44 33h8v20H4V33h19"
        stroke="#DCDFE1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        stroke="#DCDFE1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 39h8v8h-8zM24 43v4h8v-3M41 39h5v8h-8v-5"
      />
      <rect x={3} y={17.625} width={2} height={12.375} rx={1} fill="#DCDFE1" />
      <rect x={7} y={22.125} width={2} height={7.875} rx={1} fill="#DCDFE1" />
      <rect x={11} y={8.625} width={2} height={21.375} rx={1} fill="#DCDFE1" />
      <rect x={15} y={13.125} width={2} height={16.875} rx={1} fill="#DCDFE1" />
      <rect x={19} y={17.625} width={2} height={12.375} rx={1} fill="#DCDFE1" />
      <rect x={23} y={21} width={2} height={9} rx={1} fill="#DCDFE1" />
      <rect x={27} y={7.5} width={2} height={22.5} rx={1} fill="#DCDFE1" />
      <rect x={31} y={3} width={2} height={27} rx={1} fill="#DCDFE1" />
      <rect x={35} y={15.375} width={2} height={14.625} rx={1} fill="#DCDFE1" />
      <rect x={39} y={17.625} width={2} height={12.375} rx={1} fill="#DCDFE1" />
      <rect x={43} y={12} width={2} height={18} rx={1} fill="#DCDFE1" />
      <rect x={47} y={21} width={2} height={9} rx={1} fill="#DCDFE1" />
      <rect x={51} y={24.375} width={2} height={5.625} rx={1} fill="#DCDFE1" />
      <g filter="url(#prefix__filter0_d)">
        <path
          d="M28 38c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
          fill="#fff"
        />
        <path
          d="M28 38c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10z"
          stroke="#8DA0B3"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27 22a1 1 0 112 0v1h1a2 2 0 012 2 1 1 0 11-2 0h-4a1 1 0 100 2h4a3 3 0 110 6h-1v1a1 1 0 11-2 0v-1h-1a2 2 0 01-2-2 1 1 0 112 0h4a1 1 0 100-2h-4a3 3 0 110-6h1v-1z"
        fill="#8DA0B3"
      />
      <defs>
        <filter
          id="prefix__filter0_d"
          x={17}
          y={17}
          width={24}
          height={24}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx={2} dy={2} />
          <feColorMatrix values="0 0 0 0 0.94902 0 0 0 0 0.937255 0 0 0 0 0.941176 0 0 0 1 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default SvgComponent;
