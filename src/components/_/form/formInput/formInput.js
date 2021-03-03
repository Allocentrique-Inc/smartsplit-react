export default function FormInput(props) {
  const {
    children,
    errors,
    triedSubmit,
    errorTranslations,
    language,
    ...nextProps
  } = props;
  const showErrors = errors.length > 0 && triedSubmit;
  const classNames = `formInput ${showErrors ? 'error' : ''}`;
  const displayTranslation = (error) => {
    const translations = errorTranslations[`_${error}`];
    if (!translations) {
      return null;
    }
    const translation = translations[language];
    return (
      <p className="error" key={error}>
        {typeof translation === 'string' && translation}
        {typeof translation === 'function' && translation()}
      </p>
    );
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
