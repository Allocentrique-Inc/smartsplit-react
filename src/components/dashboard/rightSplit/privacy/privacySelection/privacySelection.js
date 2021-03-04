const DividingMethod = (props) => {
  const t_title =
    props.translations.rightSplit.privacySettings._title[props.language];
  const t_public =
    props.translations.rightSplit.privacySettings._public[props.language];
  const t_private =
    props.translations.rightSplit.privacySettings._private[props.language];
  const handlePublicBtn = () => {
    props.setIsPublic(true);
  };
  const handlePrivateBtn = () => {
    props.setIsPublic(false);
  };
  return (
    <div className="privacySelection">
      {/* TITLE */}
      <div className="title">{t_title}</div>

      {/* OPTIONS */}
      <div>
        <button className="radioRow" onClick={handlePrivateBtn}>
          <div className="radioCircle">
            {!props.isPublic && <div className="innerSelected" />}
          </div>
          <div className="splitingMethod">{t_private}</div>
        </button>
      </div>
      <div>
        <button className="radioRow" onClick={handlePublicBtn}>
          <div className="radioCircle">
            {props.isPublic && <div className="innerSelected" />}
          </div>
          <div className="splitingMethod">{t_public}</div>
        </button>
      </div>
    </div>
  );
};
export default DividingMethod;
