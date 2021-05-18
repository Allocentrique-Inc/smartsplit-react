const Tag = ({ language, type = 'draft' }) => {
  let t_label;
  let style;
  switch (type) {
    case 'inVote':
      t_label = { fr: 'En attente de décision', en: 'Awaiting decision ' }[
        language
      ];
      style = {
        background: '#FFE5A1',
        color: '#A55108',
      };
      break;
    case 'accepted': {
      t_label = { fr: 'Acceptée', en: 'Accepted' }[language];
      style = {
        fontWeight: 'bold',
        background: '#DFF8E3',
        color: '#176D25',
      };
      break;
    }
    case 'rejected': {
      t_label = { fr: 'Refusée', en: 'Refused' }[language];
      style = {
        fontWeight: 'bold',
        background: '#FBD4D4',
        color: '#AC1616',
      };
      break;
    }
    case 'draft':
    default:
      t_label = { fr: "En attente d'envoi", en: 'Waiting to be sent' }[
        language
      ];
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
