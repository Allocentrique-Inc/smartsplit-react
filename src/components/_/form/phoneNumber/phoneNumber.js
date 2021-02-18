import React, { useState, useEffect, useCallback } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Colors } from '../../../../theme';
import MoreHorizontal from '../../../../icons/moreHorizontal';
import CheckMark from '../../../../icons/checkMark';

export default function PhoneNumber(props) {
  const { value, onChange, status = 'unverified', ...nextProps } = props;
  const StatusIcon = {
    unverified: <MoreHorizontal />,
    pending: <MoreHorizontal />,
    active: <CheckMark />,
    verified: <CheckMark color={Colors.action} />,
  };
  function toInternational(number) {
    if (!number) return;
    const parsed = parsePhoneNumberFromString(number, 'CA');
    return parsed && parsed.number;
  }

  function toDisplayNumber(number) {
    if (!number) return;
    const parsed = parsePhoneNumberFromString(number, 'CA');
    return parsed && parsed.formatNational();
  }

  const [currentValue, setCurrentValue] = useState(value || '');
  const [fieldValue, setFieldValue] = useState(toDisplayNumber(value) || '');

  const handleChange = useCallback(
    (number) => {
      setFieldValue(number);

      const parsed = toInternational(number);

      if (parsed && parsed !== currentValue) {
        if (onChange) {
          onChange(parsed);
        }
        setCurrentValue(parsed);
      }
    },
    [currentValue],
  );

  const handleOnBlur = useCallback(() => {
    const formattedNumber = toDisplayNumber(fieldValue);
    setFieldValue(formattedNumber || fieldValue);
  }, [fieldValue]);

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
      handleOnBlur();
    }
  }, [value, currentValue]);

  return (
    <div className="row" {...nextProps}>
      <input value={fieldValue} onChange={handleChange} onBlur={handleOnBlur} />
      {StatusIcon[status]}
    </div>
  );
}
