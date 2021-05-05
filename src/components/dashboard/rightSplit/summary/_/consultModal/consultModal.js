import ArtistName from '../../../../_/artistName/artistName';
import LastModified from '../../../../_/lastModified/lastModified';
import Consult from '../../../consult/consult';

const ConsultModal = (props) => {
  const {
    setShowModal,
    setIsAdjustingEmails,
    t_createdBy,
    t_updated,
    t_sendToCollab,
  } = props;
  const canSendToCollab =
    props.workpiece.rightSplit.owner.user_id === props.user.user_id;
  return (
    <div className="modalBackground" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="topBar">
          <div
            className="title"
            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            Version {props.workpiece.rightSplit.version}
            <div className="consult-details">
              {t_createdBy}{' '}
              <ArtistName
                user={props.workpiece.rightSplit.owner}
                className="artistName"
              />
              {' - \u00A0'}
              <LastModified
                date={props.workpiece.rightSplit.updatedAt}
                language={props.language}
              >
                {`${t_updated}`}
              </LastModified>
            </div>
          </div>
          <div
            className="exit"
            onClick={() => {
              setShowModal(false);
              setIsAdjustingEmails(false);
            }}
          >
            <X />
          </div>
        </div>
        <div className="content postSaveConsult">
          <Consult
            {...props}
            voting={false}
            rightSplitInConsultation={props.workpiece.rightSplit}
          />
        </div>
        <div className="downBar">
          {props.workpiece.rightSplit._state === 'draft' && canSendToCollab && (
            <button
              className="btn-primary"
              onClick={() => {
                setIsAdjustingEmails(true);
              }}
            >
              {t_sendToCollab}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultModal;
