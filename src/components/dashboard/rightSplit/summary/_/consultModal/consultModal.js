import ArtistName from '../../../../_/artistName/artistName';
import LastModified from '../../../../_/lastModified/lastModified';
import Consult from '../../../consult/consult';
import X from '../../../../../../icons/x';

const ConsultModal = (props) => {
  const {
    setShowModal,
    setIsAdjustingEmails,
    t_createdBy,
    t_updated,
    t_sendToCollab,
    rightSplitInConsultation,
  } = props;
  console.log({ rightSplitInConsultation });
  const canSendToCollab =
    rightSplitInConsultation.owner.user_id === props.user.user_id;
  return (
    <div className="modalBackground" onClick={() => setShowModal(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="topBar">
          <div
            className="title"
            style={{ flexDirection: 'column', alignItems: 'flex-start' }}
          >
            Version {rightSplitInConsultation.version}
            <div className="consult-details">
              {t_createdBy}{' '}
              <ArtistName
                user={rightSplitInConsultation.owner}
                className="artistName"
              />
              {' - \u00A0'}
              <LastModified
                date={rightSplitInConsultation.updatedAt}
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
          <Consult {...props} voting={false} />
        </div>
        {rightSplitInConsultation._state === 'draft' && canSendToCollab && (
          <div className="downBar">
            <button
              className="btn-primary"
              onClick={() => {
                setIsAdjustingEmails(true);
              }}
            >
              {t_sendToCollab}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultModal;
