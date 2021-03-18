import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './topBar/topBar';
import Consult from '../consult/consult';
import X from '../../../../icons/x';
import AdjustEmails from './adjustEmails/adjustEmails';
import DownloadContractButton from './downloadContractButton/downloadContractButton';
import PaymentModal from '../../_/payments/PaymentModal';

const Summary = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const [consulting, setConsulting] = useState(null);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(false);
  if (
    !props.workpiece.rightSplit ||
    !props.workpiece.rightSplit._state ||
    !props.workpiece.archivedSplits
  ) {
    history.push(`/workpiece/${workpiece_id}/`);
    return null;
  }
  const user_id = localStorage.getItem('user_id');

  const hasToVote = [
    ...props.workpiece.rightSplit.copyright,
    ...props.workpiece.rightSplit.performance,
    ...props.workpiece.rightSplit.recording,
  ]
    .filter((el) => el.rightHolder_id === user_id)
    .some((el) => el.vote === 'undecided');

  const canSendToCollab =
    props.workpiece.rightSplit.owner.user_id === props.user.user_id;

  const t_splitSummary = {
    fr: 'Résumé du partage',
    en: 'Split Summary',
  }[props.language];
  const t_createdBy = {
    fr: 'Créé par',
    en: 'Created by',
  }[props.language];
  const t_waitingSubmit = {
    fr: "En attente d'envoi",
    en: 'Waiting to be sent',
  }[props.language];
  const t_waitingDecision = {
    fr: 'En attente de décision',
    en: 'Waiting for a decision',
  }[props.language];
  const t_decided = {
    fr: 'Décidés',
    en: 'Decided',
  }[props.language];
  const t_sendToCollab = {
    fr: 'Envoyer aux collaborateurs',
    en: '',
  }[props.language];
  const t_consult = {
    fr: 'Consulté',
    en: 'Consult',
  }[props.language];
  const t_accepted = {
    fr: 'Accepté',
    en: 'Accepted',
  }[props.language];
  const t_rejected = {
    fr: 'Rejeté',
    en: 'Rejected',
  }[props.language];
  const t_download = {
    fr: "Télécharger l'entente",
    en: 'Download the contract',
  }[props.language];
  const t_createANewOne = {
    fr: 'Créer un nouveau modèle',
    en: 'Create a new model',
  }[props.language];
  const commonProps = {
    ...props,
    setIsAdjustingEmails,
    setConsulting,
    hasToVote,
    t_createdBy,
    t_consult,
    t_accepted,
    t_rejected,
    t_download,
    t_createANewOne,
  };
  if (!props.isLoaded) {
    return null;
  }
  return (
    <>
      {/* CONSULT */}
      {consulting &&
        (isAdjustingEmails ? (
          <AdjustEmails {...commonProps} />
        ) : (
          <div className="modalBackground" onClick={() => setConsulting(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="topBar">
                <div className="title">Version {consulting.version}</div>
                <div
                  className="exit"
                  onClick={() => {
                    setConsulting(null);
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
                  modifiable={consulting._state === 'draft'}
                  rightSplitInConsultation={consulting}
                />
              </div>
              <div className="downBar">
                {consulting._state === 'draft' && canSendToCollab && (
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
        ))}

      <div className="summary">
        <TopBar {...props} />
        <div className="b1">
          <div className="b1b1">
            <div className="pageTitle">{t_splitSummary}</div>

            <div className="splitDetails">
              {t_createdBy}
              <span className="artistName">
                {`${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName}`}
              </span>
              {/* - Mis à jour
              <span className="lastModify">-------</span> */}
            </div>

            <div className="b1b1b2">
              {/* DRAFT */}
              <div className="bx">
                <div className="colTitle">{t_waitingSubmit}</div>
                <div className="content">
                  {props.workpiece.rightSplit._state === 'draft' && (
                    <DraftRightSplit {...commonProps} {...props} isDraft />
                  )}
                </div>
              </div>

              {/* INVOTE */}
              <div className="bx">
                <div className="colTitle">{t_waitingDecision}</div>
                <div className="content">
                  {props.workpiece.rightSplit._state === 'voting' && (
                    <InVoteRightSplit {...commonProps} {...props} />
                  )}
                </div>
              </div>

              {/* DECIDED */}
              <div className="bx">
                <div className="colTitle">{t_decided}</div>
                <div className="content">
                  {/* ACCEPTED */}
                  {props.workpiece.rightSplit._state === 'accepted' && (
                    <AcceptedRightSplit {...commonProps} {...props} />
                  )}

                  {/* REJECTED */}
                  {props.workpiece.rightSplit._state === 'rejected' && (
                    <RejectedRightSplit {...commonProps} {...props} />
                  )}
                  {props.workpiece.archivedSplits &&
                    props.workpiece.archivedSplits.map(
                      (archivedRightSplit, id) => {
                        return (
                          <RejectedRightSplitArchived
                            id={id}
                            {...commonProps}
                            archivedRightSplit={archivedRightSplit}
                            key={archivedRightSplit.version}
                            // workpiece={workpiece}
                          />
                        );
                      },
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;

const DraftRightSplit = (props) => {
  const versionIndex = props.workpiece.rightSplit.version;
  const t_sendToCollab = {
    fr: 'Envoyer aux collaborateurs',
    en: '',
  }[props.user.locale];
  const canSendToCollab =
    props.workpiece.rightSplit.owner.user_id === props.user.user_id;

  return (
    <div className="rightSplit">
      <div
        className="clickableContainer"
        onClick={() => props.setConsulting(props.workpiece.rightSplit)}
      >
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <span className="artistName">
            {` ${props.workpiece.rightSplit.owner.firstName} ${props.workpiece.rightSplit.owner.lastName} `}
          </span>
        </div>
        <div className="b1">
          <div />
        </div>

        {canSendToCollab ? (
          <>
            <div className="border" />
            <button>{t_sendToCollab}</button>
          </>
        ) : (
          <button>{props.t_consult}</button>
        )}
      </div>
    </div>
  );
};

const AcceptedRightSplit = (props) => {
  console.log('PROPS SUMMARY', props);
  const versionIndex = props.workpiece.rightSplit.version;
  const productCode = 'RIGHT_SPLIT_DOWNLOAD';
  const [showPaymentModal, setShowPaymentModal] = useState();
  const modalProps = {
    productCode,
    ...props,
    setShowModal: setShowPaymentModal,
  };
  const hasBoughtPDF = Object.values(props.workpiece.purchases).length > 0;
  return (
    <>
      <div
        className="rightSplit"
        style={{ marginBottom: '8px' }}
        onClick={() => props.setConsulting(props.workpiece.rightSplit)}
      >
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <span className="artistName">
            {` ${props.workpiece.rightSplit.owner.firstName} ${props.workpiece.rightSplit.owner.lastName} `}
          </span>
        </div>
        <div className="b1">
          <div />
          <div className="status acceptedStatus">{props.t_accepted}</div>
        </div>
        <DownloadContractButton language={props.language} />

        {/*{hasBoughtPDF ? (
          <DownloadContractButton language={props.language} />
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPaymentModal(true);
            }}
          >
            {props.t_download}
          </button>
        )}*/}
      </div>
      {showPaymentModal && <PaymentModal {...modalProps} />}
    </>
  );
};

const InVoteRightSplit = (props) => {
  const versionIndex = props.workpiece.rightSplit.version;
  return (
    <div className="rightSplit">
      <div
        className="clickableContainer"
        onClick={() => props.setConsulting(props.workpiece.rightSplit)}
      >
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <span className="artistName">
            {` ${props.workpiece.rightSplit.owner.firstName} ${props.workpiece.rightSplit.owner.lastName} `}
          </span>
        </div>
        <button>{props.t_consult}</button>
      </div>
    </div>
  );
};

const RejectedRightSplit = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const versionIndex = props.workpiece.rightSplit.version;
  const handleCreateANewModelBtn = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/copyright`);
  return (
    <div className="rightSplit" style={{ marginBottom: '8px' }}>
      <div
        className="clickableContainer"
        onClick={() => {
          props.setConsulting(props.workpiece.rightSplit);
        }}
      >
        <div className="title">{`Version ${versionIndex}`}</div>
        <div className="details">
          {props.t_createdBy}
          <span className="artistName">
            {` ${props.workpiece.rightSplit.owner.firstName} ${props.workpiece.rightSplit.owner.lastName} `}
          </span>
        </div>
        <div className="b1">
          <div />
          <div className="status rejectedStatus">{props.t_rejected}</div>
        </div>
        <button onClick={handleCreateANewModelBtn}>
          {props.t_createANewOne}
        </button>
        <button>{props.t_consult}</button>
      </div>
    </div>
  );
};

const RejectedRightSplitArchived = (props) => {
  const versionIndex = props.archivedRightSplit.version;
  return (
    <div
      className="rightSplit"
      onClick={() => props.setConsulting(props.workpiece.rightSplit)}
    >
      <div className="title">{`Version ${versionIndex}`}</div>
      <div className="details">
        {props.t_createdBy}
        <span className="artistName">
          {` ${props.archivedRightSplit.owner.firstName} ${props.archivedRightSplit.owner.lastName} `}
        </span>
      </div>
      <div className="b1">
        <div />
        <div className="status rejectedStatus">{props.t_rejected}</div>
      </div>
      <button>{props.t_consult}</button>
    </div>
  );
};
