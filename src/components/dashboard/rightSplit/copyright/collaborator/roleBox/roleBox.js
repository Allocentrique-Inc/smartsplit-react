const RoleBox = (props) => {
  const isPresent = props.collaborator.roles.some((EL) => props.role === EL);
  return (
    <div
      className="checkBoxRow"
      onClick={() => {
        if (isPresent) {
          props.deleteRole(props.role, props.collaborator.rightHolder_id);
        } else {
          props.addRole(props.role, props.collaborator.rightHolder_id);
        }
      }}
    >
      <input type="checkbox" checked={isPresent} onChange={() => {}} />
      <label>{props.role}</label>
    </div>
  );
};

export default RoleBox;
