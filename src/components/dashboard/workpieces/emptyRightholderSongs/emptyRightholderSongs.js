import EmptyIcon from '../_/emptyIcon';

const EmptyRightholderSongs = (props) => {
  const t_text1 =
    props.translations.workpieces.emptyRightholderSongs._text1[props.language];
  const t_text2 =
    props.translations.workpieces.emptyRightholderSongs._text2[props.language];
  return (
    <div className="empty">
      <div>
        <EmptyIcon />
      </div>
      <div className="text1">{t_text1}</div>
      <div className="text2">{t_text2}</div>
    </div>
  );
};

export default EmptyRightholderSongs;
