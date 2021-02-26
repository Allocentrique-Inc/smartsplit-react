const CollaboratorErrors = (props) => (
  <>
    {props.triedSubmit &&
      props.collaborator &&
      props.collaborator.errors &&
      props.collaborator.errors.length > 0 && (
        <div className="collaboratorTextErrors">
          {props.collaborator.errors.map((el, id) => (
            <div style={{ marginRight: '8px' }} key={el}>
              {el}
            </div>
          ))}
        </div>
    )}
  </>
);

export default CollaboratorErrors;
