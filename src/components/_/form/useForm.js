import { useState } from 'react';
import validate from './_/validate';

export default function useForm(iniFields = {}, dirtyMode = false) {
  const [fields, setFields] = useState(iniFields);
  const setField = (field, value) => {
    setFields((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        ...value,
        isDirty: true,
      },
    }));
  };
  const toJS = () => {
    const values = {};
    Object.entries(fields).forEach(([fieldName, field]) => {
      if (!field.excluded) {
        if (!dirtyMode || (dirtyMode && field.isDirty)) {
          values[fieldName] = field.value;
        }
      }
    });
    return values;
  };
  const handlers = {};
  Object.entries(fields).forEach(([fieldName, field]) => {
    if (typeof field.value === 'boolean') {
      handlers[fieldName] = () =>
        setField(fieldName, {
          errors: [],
          value: !field.value,
        });
    } else {
      handlers[fieldName] = (e) =>
        setField(fieldName, {
          errors: [],
          value: e.target.value,
        });
    }
  });
  const isValid = () => {
    let fieldsToValidate = {};
    if (dirtyMode) {
      Object.entries(fields)
        .filter(([key, value]) => value.isDirty)
        .forEach(([key, value]) => {
          fieldsToValidate[key] = value;
        });
    } else {
      fieldsToValidate = fields;
    }
    const result = validate(fieldsToValidate);
    setFields({ ...fieldsToValidate });
    return result;
  };
  const reset = () => setFields(iniFields);
  const loadFields = (values) => {
    Object.entries(values).forEach(([key, value]) => {
      if (fields[key]) {
        setFields((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            value,
          },
        }));
      }
    });
  };
  return {
    fields,
    setFields,
    setField,
    toJS,
    handlers,
    isValid,
    reset,
    loadFields,
  };
}
