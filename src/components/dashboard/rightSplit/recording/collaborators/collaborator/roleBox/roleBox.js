const RoleBox = (props) => {
  const isPresent = props.recording[props.id].roles.some(
    (EL) => props.role === EL
  );
  return (
    <div key={props.role}>
      <input
        type="checkbox"
        id="vehicle3"
        name="vehicle3"
        checked={isPresent}
        onClick={() => {
          if (isPresent) {
            props.deleteRole(props.role, props.id);
          } else {
            props.addRole(props.role, props.id);
          }
        }}
        onChange={() => {}}
      />
      <label>{props.role}</label>
    </div>
  );
};

export default RoleBox;
