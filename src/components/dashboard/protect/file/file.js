import TopBar from '../_/topBar/topBar';

const File = (props) => {
  const t_rightCrumb = {
    fr: 'Fichier',
    en: 'File',
  }[props.language];
  return (
    <div className="file">
      <TopBar {...props} rightCrumb={t_rightCrumb} />
      FILE
    </div>
  );
};

export default File;
