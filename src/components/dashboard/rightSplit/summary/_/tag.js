const Tag = ({ language, type = 'draft' }) => {
  let t_label;
  let color;
  switch (type) {
    case 'draft':
    default:
      t_label = { fr: '' };
      color = 'rgba(245, 242, 243, 1)';
  }
  return (
    <div className={`tag ${className}`} style={{ background: color }}>
      {children}
    </div>
  );
};

export default Tag;
