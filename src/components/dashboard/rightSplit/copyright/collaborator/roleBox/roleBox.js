const RoleBox = (props) => {
  const isPresent = props.copyright[props.id].roles.some(
    (EL) => props.role === EL,
  );
  return (
    <div key={props.role}>
      <input
        type="checkbox"
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
