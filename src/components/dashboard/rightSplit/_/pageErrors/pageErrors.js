const PageErrors = (props) => {
  return (
    <>
      {props.errors && props.errors.length !== 0 && (
        <div className="pageErrors">
          {props.errors.map((el) => {
            let t_error = props.translations.rightSplit.errors[el];
            t_error = t_error && t_error[props.user.locale];
            return <div key={el}>{t_error}</div>;
          })}
        </div>
      )}
    </>
  );
};

export default PageErrors;
