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
    fontFamily: 'IBM Plex Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#203548',
  },
};

const Option = (props) => {
  const backgroundColor = props.dividingMethod === props.value ? 'black' : '#fff';
  return (
    <div>
      <button
        style={style.radioRow}
        onClick={() => {
          props.handleSelectDividingMethod(props.value);
        }}
      >
        <div
          style={{
            ...style.radioCircle,
            backgroundColor,
          }}
        />
        <div style={style.splitingMethod}>{props.label}</div>
      </button>
    </div>
  );
};

export default Option;
