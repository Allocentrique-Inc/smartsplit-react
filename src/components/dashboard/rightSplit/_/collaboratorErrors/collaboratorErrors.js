const CollaboratorErrors = (props) => {
  // console.log(props.translations.rightSplit.errors);
  // console.log(props.user.locale);
  return (
    <>
      {props.triedSubmit &&
        props.collaborator &&
        props.collaborator.errors &&
        props.collaborator.errors.length > 0 && (
          <div className="collaboratorTextErrors">
            {props.collaborator.errors.map((el, id) => {
              let t_error = props.translations.rightSplit.errors[el];
              t_error = t_error && t_error[props.user.locale];
              return (
                <div style={{ marginRight: '8px' }} key={el}>
                  {t_error}
                </div>
              );
            })}
          </div>
        )}
    </>
  );
};

export default CollaboratorErrors;
