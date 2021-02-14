const RoleBox = (props) => {
  const isPresent = props.performance[props.id].roles.some(
    (EL) => props.role === EL,
  );
  return (
    <div
      className="checkBoxRow"
      onClick={() => {
        if (isPresent) {
          props.deleteRole(props.role, props.id);
        } else {
          props.addRole(props.role, props.id);
        }
      }}
    >
      <input type="checkbox" checked={isPresent} onChange={() => {}} />
      <label>{props.role}</label>
    </div>
  );
};

export default RoleBox;
