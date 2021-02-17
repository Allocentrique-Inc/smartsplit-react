import CheckMark from '../../../../../../icons/check-mark';

const RoleBox = (props) => {
  const isPresent = props.collaborator.roles.some((EL) => props.role === EL);
  const label =
    props.translations.rightSplit.copyrightRoles[`_${props.role}`][
      props.language
    ];
  const handleToggle = () => {
    if (isPresent) {
      props.deleteRole(props.role, props.collaborator.rightHolder_id);
    } else {
      props.addRole(props.role, props.collaborator.rightHolder_id);
    }
  };
  return (
    <div className="checkBoxRow">
      <div className="checkBox" onClick={handleToggle}>
        {isPresent && (
          <div className="isChecked">
            <CheckMark />
          </div>
        )}
      </div>
      <label>{label}</label>
    </div>
  );
};

export default RoleBox;
