import Option from './option/option';

const DividingMethod = (props) => (
  <div className="privacySelection">
    <div className="title"> Confidentialité du partage </div>
    {[
      { value: 'private', label: 'Privee' },
      { value: 'public', label: 'Public' },
    ].map((el) => (
      <Option key={el.value} {...props} {...el} />
    ))}
  </div>
);
export default DividingMethod;
