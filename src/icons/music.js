import * as React from 'react';
import * as PropTypes from 'prop-types';

function SvgComponent(props) {
  const { color } = props;
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
        d="M9 17H5a2 2 0 100 4h2a2 2 0 002-2v-2zm12-2h-4a2 2 0 000 4h2a2 2 0 002-2v-2z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17V5l12-2v12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
SvgComponent.propTypes = {
  color: PropTypes.string,
};
SvgComponent.defaultProps = {
  color: '#2DA84F',
};

export default SvgComponent;
