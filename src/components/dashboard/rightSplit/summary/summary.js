import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './topBar/topBar';
import Consult from '../consult/consult';
import X from '../../../../icons/x';
import AdjustEmails from './adjustEmails/adjustEmails';
import DownloadContractButton from './downloadContractButton/downloadContractButton';
import PaymentModal from '../../_/payments/PaymentModal';
import getWorkpieceContract from '../../../../api/workpieces/getWorkpieceContract';
import LastModified from '../../_/lastModified/lastModified';

const Summary = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const [consulting, setConsulting] = useState(null);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(false);
  const [tab, setTab] = useState('withCollaborators');
  const [showQuestionWithEditor, setShowQuestionWithEditor] = useState(false);

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

  const handleWithCollaborators = () => {
    setTab('withCollaborators');
  };

  const needResponseToHaveEditor = !(
    props.editor &&
    props.editor.rightHolder &&
    props.editor.rightHolder.user_id
  );
  const handleWithEditor = () => {
    if (
      props.editor &&
      props.editor.rightHolder &&
      props.editor.rightHolder.user_id
    ) {
      setTab('withEditor');
    } else {
      setShowQuestionWithEditor(true);
    }
  };
  const isWithEditorDisabled = !(
    props.workpiece.rightSplit &&
    props.workpiece.rightSplit._state === 'accepted'
  );
  const handleGoToEditorName = () => {
    history.push(`/workpiece/${workpiece_id}/right-split/editor-name`);
  };

  const handleCancelShowQuestionWithEditor = () => {
    setShowQuestionWithEditor(false);
  };

  // const handleWithManager = () => {
  //   setTab('withManager');
  // };
  // const isWithManagerDisabled = !(
  //   props.workpiece.rightSplit &&
  //   props.workpiece.rightSplit._state === 'accepted'
  // );
  // const handleGoToManagerName = () => {
  //   history.push(`/workpiece/${workpiece_id}/right-split/manager-name`);
  // };
  // const needResponseToHaveManager = true;

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
  const t_withCollaborators = {
    fr: 'Avec mes collaborateurs',
    en: 'With my collaborators',
  }[props.language];
  const t_withEditor = {
    fr: 'Avec mon éditeur',
    en: 'With my editor',
  }[props.language];
  const t_withManager = {
    fr: 'Avec mon manager',
    en: 'With my manager',
  }[props.language];
  const t_haveEditor = {
    fr: 'As-tu un éditeur?',
    en: 'Do you have an editor?',
  }[props.language];
  const t_haveManager = {
    fr: 'As-tu un manager?',
    en: 'Do you have a manager?',
  }[props.language];
  const t_yes = {
    fr: 'Oui',
    en: 'Yes',
  }[props.language];
  const t_no = {
    fr: 'Non',
    en: 'No',
  }[props.language];
  const t_later = {
    fr: 'Plus tard',
    en: 'Later',
  }[props.language];
  const t_updated = {
    fr: 'Mis à jour',
    en: 'Updated',
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
    t_updated,
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
                <div className="title" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>Version {consulting.version}
                  <div className="consult-details">
                    {t_createdBy} <span className="artistName">{` ${consulting.owner.firstName} ${consulting.owner.lastName}. `}</span><LastModified date={consulting.updatedAt} language={props.language}>{`${t_updated}`}</LastModified>
                  </div>
                </div>
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

            {/* TABS */}
            <div className="tabs">
              <button
                className={tab === 'withCollaborators' ? 'tab selected' : 'tab'}
                onClick={handleWithCollaborators}
              >
                {t_withCollaborators}
              </button>
              <span className="space" />
              <div>
                <button
                  className={tab === 'withEditor' ? 'tab selected' : 'tab'}
                  onClick={handleWithEditor}
                  disabled={isWithEditorDisabled}
                >
                  {t_withEditor}
                  {!isWithEditorDisabled && needResponseToHaveEditor && (
                    <div className="notification" />
                  )}
                </button>
                {showQuestionWithEditor && (
                  <div className="withEditorOrManager">
                    <div className="question">{t_haveEditor}</div>
                    <div className="yesNo">
                      <button className="btn-secondary option">{t_no}</button>
                      <button
                        className="btn-primary option"
                        onClick={handleGoToEditorName}
                      >
                        {t_yes}
                      </button>
                    </div>
                    <div
                      onClick={handleCancelShowQuestionWithEditor}
                      className="later"
                    >
                      {t_later}
                    </div>
                  </div>
                )}
              </div>
              {/*
              <span className="space" />
              <div>
                <button
                  className={tab === 'withManager' ? 'tab selected' : 'tab'}
                  onClick={handleWithManager}
                  disabled={isWithManagerDisabled}
                >
                  {t_withManager}
                  {needResponseToHaveManager && (
                    <div className="notification" />
                  )}
                </button>
                {tab === 'withManager' && (
                  <div className="withEditorOrManager">
                    <div className="question">{t_haveManager}</div>
                    <div className="yesNo">
                      <button className="btn-secondary option">{t_no}</button>
                      <button
                        className="btn-primary option"
                        onClick={handleGoToManagerName}
                      >
                        {t_yes}
                      </button>
                    </div>
                    <div onClick={handleWithCollaborators} className="later">
                      {t_later}
                    </div>
                  </div>
                )}
              </div> */}
            </div>

            <div
              className="b1b1b2"
              //  style={{ display: tab !== 'withCollaborators' && 'none' }}
            >
              {/* DRAFT */}
              <div className="bx">
                <div className="colTitle">{t_waitingSubmit}</div>
                <div className="content">
                  {tab === 'withCollaborators' &&
                    props.workpiece.rightSplit._state === 'draft' && (
                      <DraftRightSplit {...commonProps} {...props} isDraft />
                    )}
                </div>
              </div>

              {/* INVOTE */}
              <div className="bx">
                <div className="colTitle">{t_waitingDecision}</div>
                <div className="content">
                  {tab === 'withCollaborators' &&
                    props.workpiece.rightSplit._state === 'voting' && (
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
                    <div
                      style={{
                        display: tab !== 'withCollaborators' && 'none',
                      }}
                    >
                      <AcceptedRightSplit {...commonProps} {...props} />
                    </div>
                  )}

                  {/* REJECTED */}
                  {tab === 'withCollaborators' &&
                    props.workpiece.rightSplit._state === 'rejected' && (
                      <RejectedRightSplit {...commonProps} {...props} />
                    )}
                  {tab === 'withCollaborators' &&
                    props.workpiece.archivedSplits &&
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
          <LastModified date={props.workpiece.rightSplit.createdAt} language={props.language} />
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
  const versionIndex = props.workpiece.rightSplit.version;
  const productCode = 'RIGHT_SPLIT_DOWNLOAD';
  const [showPaymentModal, setShowPaymentModal] = useState();
  const { workpiece_id } = useParams();
  const [contractData, setContractData] = useState();
  const modalProps = {
    productCode,
    ...props,
    setShowModal: setShowPaymentModal,
  };
  const hasBoughtPDF = Object.values(props.workpiece.purchases).length > 0;
  useEffect(async () => {
    if (hasBoughtPDF) {
      const result = await getWorkpieceContract({ workpiece_id });
      result.statusCode !== 500 && setContractData(result);
      result.statusCode === 500 && setContractData(null);
    }
  }, [hasBoughtPDF]);
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
        <div className="update-details">
          <LastModified date={props.workpiece.rightSplit.updatedAt} language={props.language}>{props.t_updated}</LastModified>
        </div>
        <div className="b1">
          <div />
          <div className="status acceptedStatus">{props.t_accepted}</div>
        </div>
        {/*{contractData && (
          <DownloadContractButton
            language={props.language}
            contractData={contractData}
          />
        )}*/}

        {hasBoughtPDF ? (
          <DownloadContractButton
            language={props.language}
            contractData={contractData}
          />
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
        )}
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
        <div className="update-details">
          <LastModified date={props.workpiece.rightSplit.updatedAt} language={props.language}>{props.t_updated}</LastModified>
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
        <div className="update-details">
          <LastModified date={props.workpiece.rightSplit.updatedAt} language={props.language}>{props.t_updated}</LastModified>
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
      <div className="update-details">
        <LastModified date={props.workpiece.rightSplit.updatedAt} language={props.language}>{props.t_updated}</LastModified>
      </div>
      <div className="b1">
        <div />
        <div className="status rejectedStatus">{props.t_rejected}</div>
      </div>
      <button>{props.t_consult}</button>
    </div>
  );
};
