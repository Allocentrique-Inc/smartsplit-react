import Option from './option/option';

const DividingMethod = (props) => (
  <div className="dividingMethod">
    {[
      { value: 'equal', label: 'Partager de facon egale' },
      { value: 'role', label: 'Partager selon les roles' },
      { value: 'manual', label: 'Gerer manuellement' },
    ].map((el) => (
      <Option {...props} key={el.value} {...el} />
    ))}
  </div>
);

export default DividingMethod;
