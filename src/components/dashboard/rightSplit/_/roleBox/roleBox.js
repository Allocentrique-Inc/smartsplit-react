import CheckMark from '../../../../../icons/check-mark';

const RoleBox = (props) => {
  const isPresent = props.arr.some((el) => props._role === el);
  const handleToggleRole = () => props.handleToggleRole(props._role);
  console.log(props.arr);
  return (
    <div className="checkBoxRow">
      <div className="checkBox" onClick={handleToggleRole}>
        {isPresent && (
          <div className="isChecked">
            <CheckMark />
          </div>
        )}
      </div>
      <label>{props.label}</label>
    </div>
  );
};

export default RoleBox;
