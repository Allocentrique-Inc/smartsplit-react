const style = {
  radioRow: {
    backgroundColor: '#fff',
    border: 'none',
    outline: 0,
    display: 'flex',
    height: '24px',
    alignItems: 'center',
  },
  radioCircle: {
    height: '16px',
    width: '16px',
    borderRadius: '10px',
    border: '1px solid black',
    marginRight: '16px',
  },
  splitingMethod: {
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#203548',
  },
};

const Option = (props) => {
  const backgroundColor = props.copyrightDividingMethod === props.value ? 'black' : '#fff';
  return (
    <div>
      <button
        className="radioRow"
        onClick={() => {
          props.handleSelectDividingMethod(props.value);
        }}
      >
        <div
          style={{
            backgroundColor,
          }}
          className="radioCircle"
        />
        <div className="splitingMethod">{props.label}</div>
      </button>
    </div>
  );
};

export default Option;
