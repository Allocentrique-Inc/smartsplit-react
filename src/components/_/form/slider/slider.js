import { useRef, useState, useEffect } from 'react';

const Slider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  disabled,
  color,
  step,
  vertical,
  className = '',
  ...nextProps
}) => {
  const ref = useRef();
  const handleBarClick = (e) => {
    if (disabled) return;
    const domRect = ref.current.getBoundingClientRect();
    const newValue = (100 * (e.clientX - domRect.x)) / domRect.width;
    onChange && onChange(newValue);
  };
  const handleThumbClick = (e) => e.stopPropagation();
  const percent = max === 100 ? value : ((value - min) / (max - min)) * 100;

  return (
    <div
      className="slider"
      style={{ cursor: disabled ? 'default' : 'pointer' }}
      onClick={handleBarClick}
      ref={ref}
    >
      <div className="bar">
        <div
          className="colored"
          style={{ background: color, width: `${percent}%` }}
        >
          {!disabled && (
            <div
              className="thumb"
              onClick={handleThumbClick}
              style={{ transform: 'translateX(8px)' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Slider;
