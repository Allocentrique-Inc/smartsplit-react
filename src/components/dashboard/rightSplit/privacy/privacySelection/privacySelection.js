import Option from './option/option';

const DividingMethod = (props) => {
  const t_title =
    props.translations.rightSplit.privacySettings._title[props.language];
  const t_public =
    props.translations.rightSplit.privacySettings._public[props.language];
  const t_private =
    props.translations.rightSplit.privacySettings._private[props.language];
  return (
    <div className="privacySelection">
      <div className="title">{t_title}</div>
      {[
        { value: 'private', label: t_private },
        { value: 'public', label: t_public },
      ].map((el) => (
        <Option key={el.value} {...props} {...el} />
      ))}
    </div>
  );
};
export default DividingMethod;
