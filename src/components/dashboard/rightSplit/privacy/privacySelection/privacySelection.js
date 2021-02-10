import Option from './option/option';

const style = {
  b1: {
    marginBottom: '32px',
  },
};

const DividingMethod = (props) => {
  console.log(props);
  return (
    <div style={style.b1}>
      {[
        { value: 'private', label: 'Privee' },
        { value: 'public', label: 'Public' },
      ].map((el) => (
        <Option key={el.value} {...props} {...el} />
      ))}
    </div>
  );
};
export default DividingMethod;
