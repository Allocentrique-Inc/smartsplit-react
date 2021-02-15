const Option = (props) => {
  const isSelected = props.privacy === props.value;
  return (
    <div>
      <button
        className="radioRow"
        onClick={() => {
          props.setPrivacy(props.value);
        }}
      >
        <div className="radioCircle">
          {isSelected && <div className="innerSelected" />}
        </div>
        <div className="splitingMethod">{props.label}</div>
      </button>
    </div>
  );
};

export default Option;
