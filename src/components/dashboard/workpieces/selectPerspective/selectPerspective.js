const SelectPerspective = (props) => {
  const t_mine = {
    fr: 'Mes ajouts',
    en: 'My contributions',
  }[props.language];

  const t_sharedWithMe = {
    fr: 'Partagées avec moi',
    en: 'Shared with me',
  }[props.language];
  const handleMineBtn = () => props.setTab('owner');
  const handleRightHolderBtn = () => props.setTab('rightHolder');

  return (
    <div className="selectPerspective">
      <button
        className={`tab ${props.tab === 'owner' ? 'selectedTab' : ''}`}
        onClick={handleMineBtn}
      >
        {t_mine}
      </button>
      <button
        className={`tab ${props.tab === 'rightHolder' ? 'selectedTab' : ''}`}
        onClick={handleRightHolderBtn}
      >
        {t_sharedWithMe}
      </button>
    </div>
  );
};

export default SelectPerspective;
