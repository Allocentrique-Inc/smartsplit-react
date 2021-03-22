import Option from './option/option';

const DividingMethod = (props) => {
  const t_equal =
    props.translations.rightSplit.copyrightDividingMethod._equal[
      props.language
    ];
  const t_role =
    props.translations.rightSplit.copyrightDividingMethod._role[props.language];
  const t_manual =
    props.translations.rightSplit.copyrightDividingMethod._manual[
      props.language
    ];
  return (
    <div className="dividingMethod">
      {[
        { value: 'equal', label: t_equal },
        { value: 'role', label: t_role },
        { value: 'manual', label: t_manual },
      ].map((el) => (
        <Option {...props} key={el.value} {...el} />
      ))}
    </div>
  );
};

export default DividingMethod;
