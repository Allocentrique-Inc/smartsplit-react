import EmptyIcon from '../_/emptyIcon';

const EmptyOwnerSongs = (props) => {
  const language = props.user.locale;
  const t_text1 =
    props.translations.workpieces.emptyOwnerSongs._text1[language];
  const t_text2 =
    props.translations.workpieces.emptyOwnerSongs._text2[language];
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

export default EmptyOwnerSongs;
