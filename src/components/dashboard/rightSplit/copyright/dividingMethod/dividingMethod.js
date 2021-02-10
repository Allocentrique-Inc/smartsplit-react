import Option from './option/option';

const style = {
  b1: {
    marginBottom: '32px',
  },
};

const DividingMethod = (props) => (
  <div style={style.b1}>
    {[
      { value: 'equal', label: 'Partager de facon egale' },
      { value: 'roles', label: 'Partager selon les roles' },
      { value: 'manual', label: 'Gerer manuellement' },
    ].map((el) => (
      <Option key={el.value} {...el} {...props} />
    ))}
  </div>
);

export default DividingMethod;
