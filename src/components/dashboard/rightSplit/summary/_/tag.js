const Tag = ({ language, type = 'draft' }) => {
  let t_label;
  let style;
  switch (type) {
    case 'inVote':
      t_label = { fr: 'En attente de décision', en: 'In vote' }[language];
      style = {
        background: '#FFE5A1',
        color: '#A55108',
      };
      break;
    case 'draft':
    default:
      t_label = { fr: 'Brouillon', en: 'Draft' }[language];
      style = {
        background: '#F5F2F3',
        color: '#203548',
      };
  }
  return (
    <div className="tag" style={style}>
      {t_label}
    </div>
  );
};

export default Tag;
