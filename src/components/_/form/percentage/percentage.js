import { useState, useEffect } from 'react';
import { percentageValidator } from '../_/validate';

const Percentage = ({ value, onChange, digits, disabled }) => {
  const [displayValue, setDisplayValue] = useState('');
  //Update displayed value on prop value change
  const formatPercentage = (percent) => {
    return percent ? `${percent.toFixed(percent === 100 ? 0 : 2)} %` : '0.00 %';
  };
  useEffect(() => {
    setDisplayValue(formatPercentage(value));
  }, [value]);
  const handleChange = (e) => !disabled && setDisplayValue(e.target.value);
  const handleBlur = () => {
    const isValid = percentageValidator(displayValue);
    const parsedValue = Number.parseFloat(displayValue);
    if (isValid && !!onChange && parsedValue !== value) {
      onChange(Number.parseFloat(displayValue));
      setDisplayValue(formatPercentage(Number.parseFloat(displayValue)));
    } else {
      setDisplayValue(formatPercentage(value));
    }
  };
  const handleFocus = () => setDisplayValue(value.toFixed(2));
  return (
    <input
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      className="percentageInput"
      disabled={disabled}
    />
  );
};

export default Percentage;
