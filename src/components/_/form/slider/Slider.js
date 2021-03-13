import { useState, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import colors from '../../../dashboard/rightSplit/_/colors';

const Slider = (props) => {
  const handleWidth = 20;
  const { value, setValue, range, leftLabel, rightLabel, decimalPlaces } = props;
  const min = range[0];
  const max = range[1];
  const [factor, setFactor] = useState();
  const [width, setWidth] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [left, setLeft] = useState(0);
  const dragStop = (e) => {
    if (isDragging) {
      console.log('stopping');
      e.stopPropagation();
      setIsDragging(false);
    }
  };
  const dragStart = (e) => {
    e.stopPropagation();
    setIsDragging(true);
  };
  const dragMove = (e) => {
    if (isDragging) {
      e.stopPropagation();
      let newLeft = left + e.movementX;
      if (newLeft > width - handleWidth) {
        newLeft = width - handleWidth;
      }
      if (newLeft < 0) newLeft = 0;
      setLeft(newLeft);
      decimalPlaces > 0
        ? setValue(Number(min + newLeft * factor).toPrecision(decimalPlaces))
        : setValue(Math.round(Number(min + newLeft * factor)));
    }
  };
  /**
   * x = min + newLeft * factor
   */

  const sliderBar = createRef();
  useEffect(() => {
    console.log(sliderBar);
    if (sliderBar.current) {
      if (sliderBar.current.offsetWidth) {
        if (value < min) setValue(min);
        if (value > max) setValue(max);
        const width = sliderBar.current.offsetWidth - handleWidth;
        const factor = (max - min) / width;
        const left = (value - min) / factor;
        console.log(`width: ${width} factor:${factor} left: ${left}`);
        setWidth(sliderBar.current.offsetWidth);
        setFactor(factor);
        setLeft(left);
      }
    }
    return () => {
    };
  }, [sliderBar.current, value]);
  return (
    <div className="slider">
      {leftLabel && <div className="slider-left-label">{leftLabel}</div>}
      <div className="slider-bar" ref={sliderBar}>
        <div className="slider-handle" style={{ left }} onMouseDown={dragStart} onMouseMove={dragMove} onMouseUp={dragStop} />
      </div>
      {rightLabel && <div className="slider-right-label">{rightLabel}</div>}
    </div>
  );
};

Slider.propTypes = {
  leftLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  rightLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  range: PropTypes.arrayOf(Number),
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  decimalPlaces: PropTypes.number,
};
Slider.defaultProps = {
  leftLabel: '',
  rightLabel: '',
  range: [0, 100],
  decimalPlaces: 0,
};
export default Slider;
