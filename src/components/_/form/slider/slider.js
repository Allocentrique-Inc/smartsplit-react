import { useRef, useState, useEffect } from 'react';

export default function Slider({
  min = 0,
  max = 100,
  value,
  onChange,
  disabled,
  color,
  step,
  vertical,
  ...nextProps
}) {
  const [width, setWidth] = useState(0);
  const barRef = useRef(null);
  useEffect(() => {
    setWidth(barRef.current.getBoundingClientRect().width);
  }, [window.innerWidth]);
  console.log('WIDTH', nextProps);
  const percent = max === 100 ? value : ((value - min) / (max - min)) * 100;

  return (
    <div className="slider">
      <div ref={barRef} className="bar">
        <div
          className="colored"
          style={{ background: color, width: `${percent}%` }}
        />
        <div className="handle" />
      </div>
    </div>
  );
}
