import Consult from '../../consult/consult';

const PostSaveConsult = (props) => {
  const handleQuit = () => {
    props.setIsSaved(false);
    props.setIsConsulting(false);
  };
  const handleProceed = () => {
    props.setIsAdjustingEmails(true);
  };
  return (
    <>
      <div className="topBar">
        <div className="title">Version 1</div>
        <button className="exit" onClick={handleQuit}>
          x
        </button>
      </div>
      <div className="content postSaveConsult">
        <Consult {...props} voting={false} modifiable />
      </div>
      <div className="downBar">
        <button className="btn-primary" onClick={handleProceed}>
          Envoyer aux collaborateurs
        </button>
      </div>
    </>
  );
};

export default PostSaveConsult;
