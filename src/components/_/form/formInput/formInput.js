export default function FormInput(props) {
  const {
    children,
    errors,
    triedSubmit,
    errorTranslations,
    language,
    ...nextProps
  } = props;
  console.log('PROPS', errorTranslations._shouldNotBeEmpty.fr);
  const showErrors = errors.length > 0 && triedSubmit;
  const classNames = `formInput ${showErrors ? 'error' : ''}`;
  return (
    <div className={classNames} {...nextProps}>
      {Array.isArray(children) && children.slice(0, 2)}
      {!Array.isArray(children) && children}
      {showErrors &&
        errors &&
        errors.map((error) => (
          <p className="error" key={error}>
            {errorTranslations[`_${error}`][language]}
          </p>
        ))}
      {Array.isArray(children) && children.length > 1 && children.slice(2)}
    </div>
  );
}
