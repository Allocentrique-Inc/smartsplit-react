import { useState } from 'react';
import generalTranslations from '../../../../translations/general';

export default function FormInput(props) {
  const {
    children,
    errors,
    triedSubmit,
    errorTranslations,
    language,
    className = '',
    ...nextProps
  } = props;
  const [translations] = useState({
    ...generalTranslations.formErrors,
    ...errorTranslations,
  });
  const showErrors = errors.length > 0 && triedSubmit;
  const classNames = `formInput ${showErrors ? 'error' : ''} ${className}`;
  const displayTranslation = (error) => {
    try {
      const translation = translations[`_${error}`][language];
      return (
        <p className="error" key={error}>
          {typeof translation === 'string' && translation}
          {typeof translation === 'function' && translation()}
        </p>
      );
    } catch {
      return null;
    }
  };
  return (
    <div className={classNames} {...nextProps}>
      {Array.isArray(children) && children.slice(0, 2)}
      {!Array.isArray(children) && children}
      {showErrors && errors && errors.map((error) => displayTranslation(error))}
      {Array.isArray(children) && children.length > 1 && children.slice(2)}
    </div>
  );
}
