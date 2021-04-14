import Checkbox from '../../../../_/form/checkbox/checkbox';

const RoleBox = (props) => {
  const isPresent = props.arr.some((el) => props._role === el);
  const handleToggleRole = () => props.handleToggleRole(props._role);
  return (
    <Checkbox
      label={props.label}
      checked={isPresent}
      onChange={handleToggleRole}
    />
  );
};

export default RoleBox;
