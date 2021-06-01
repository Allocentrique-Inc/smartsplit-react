import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import TopBar from './_/topBar/topBar';
import Consult from '../consult/consult';
import X from '../../../../icons/x';
import AdjustEmails from './adjustEmails/adjustEmails';
import DownloadContractButton from './downloadContractButton/downloadContractButton';
import PaymentModal from '../../_/payments/PaymentModal';
import getWorkpieceContract from '../../../../api/workpieces/getWorkpieceContract';
import LastModified from '../../_/lastModified/lastModified';
import AcceptedRightSplit from './acceptedRightSplit/acceptedRightSplit';
import DraftRightSplit from './draftRightSplit/draftRightSplit';
import InVoteRightSplit from './inVoteRightSplit/inVoteRightSplit';
import RejectedRightSplit from './rejectedRightSplit/rejectedRightSplit';
import RejectedRightSplitArchived from './rejectedRightSplitArchived/rejectedRightSplitArchived';
import MobileSummary from './mobileSummary/mobileSummary';
import ArtistName from '../../_/artistName/artistName';
import ConsultModal from './_/consultModal/consultModal';
import disableEditorNotif from '../../../../api/workpieces/disableEditorNotif';
import Tabs, { Tab } from '../../_/tabs/tabs';
import Kanban from './_/kanban/kanban';
import Dot from '../../../../icons/dot';

const Summary = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(false);
  const [showTabQuestionModal, setShowTabQuestionModal] = useState(false);
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
  const handleHasEditorAnswer = async (answer) => {
    await disableEditorNotif({ workpiece_id });
    props.resetData();
    setShowTabQuestionModal(false);
  };
  const user_id = localStorage.getItem('user_id');
  const currentCollaborator = props.workpiece.collaborators.find(
    (x) => x.user.user_id === user_id,
  );

  const [rightSplitInConsultation, setRightSplitInConsultation] = useState();

  const isCopyrightRightHolder = props.workpiece.rightSplit.copyright.some(
    (el) => el.rightHolder_id === props.user.user_id,
  );

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

  const handleWithEditor = () => {
    currentCollaborator.displayEditorNotif
      ? setShowQuestionWithEditor(true)
      : setTab('withEditor');
  };
  const isWithEditorDisabled =
    !props.workpiece.rightSplit ||
    props.workpiece.rightSplit._state !== 'accepted' ||
    !isCopyrightRightHolder;

  const handleGoToEditorName = () => {
    history.push(`/workpiece/${workpiece_id}/right-split/editor-name`);
  };

  const handleEditorTabClick = () => {
    if (!isWithEditorDisabled && currentCollaborator.displayEditorNotif) {
      setShowTabQuestionModal(true);
      return false;
    }
    return true;
  };

  const handleClick = () => {
    if (!hasToVote) {
      setRightSplitInConsultation(props.workpiece.rightSplit);
      setShowModal(true);
    } else {
      history.push(`/workpiece/${workpiece_id}/right-split/vote`);
    }
  };

  const handleSummaryClick = () => {
    if (showTabQuestionModal) {
      setShowTabQuestionModal(false);
    }
  };

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
    en: 'Send to collaborators',
  }[props.language];
  const t_consult = {
    fr: 'Consulter',
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
    fr: 'Créer une nouvelle version',
    en: 'Create a new version',
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
  const tabOptions = [
    t_withCollaborators,
    <>
      {t_withEditor}
      {!isWithEditorDisabled && currentCollaborator.displayEditorNotif && (
        <Dot />
      )}
    </>,
  ];
  const commonProps = {
    ...props,
    setIsAdjustingEmails,
    hasToVote,
    handleClick,
    setShowModal,
    rightSplitInConsultation,
    setRightSplitInConsultation,
    t_sendToCollab,
    t_splitSummary,
    t_waitingSubmit,
    t_waitingDecision,
    t_withCollaborators,
    t_withEditor,
    t_createdBy,
    t_consult,
    t_accepted,
    t_rejected,
    t_decided,
    t_download,
    t_createANewOne,
    t_updated,
    handleWithEditor,
    handleGoToEditorName,
    currentCollaborator,
    isWithEditorDisabled,
    tabOptions,
  };

  if (!props.isLoaded) {
    return null;
  }
  return (
    <>
      {/* CONSULT */}
      {props.isMobile && <MobileSummary {...commonProps} />}
      {!props.isMobile &&
        showModal &&
        (isAdjustingEmails ? (
          <AdjustEmails {...commonProps} />
        ) : (
          <ConsultModal {...commonProps} />
        ))}
      {!props.isMobile && (
        <div className="summary" onClick={handleSummaryClick}>
          <TopBar {...props} />
          <main>
            <h2>{t_splitSummary}</h2>
            <p>
              {t_createdBy}
              <ArtistName user={props.workpiece.owner} className="artistName" />
              {'\u00A0'}-{'\u00A0'}
              <LastModified
                date={props.workpiece.updatedAt}
                language={props.language}
              >
                {t_updated}
              </LastModified>
            </p>
            {showTabQuestionModal && (
              <div
                className="tabQuestionModal"
                onClick={(e) => e.stopPropagation()}
              >
                <p>{t_haveEditor}</p>
                <div className="row">
                  <button
                    className="btn-secondary"
                    onClick={() => handleHasEditorAnswer(false)}
                  >
                    {t_no}
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => handleHasEditorAnswer(true)}
                  >
                    {t_yes}
                  </button>
                </div>
                <button
                  className="btn-secondary-small"
                  onClick={() => setShowTabQuestionModal(false)}
                >
                  {t_later}
                </button>
              </div>
            )}
            {/* TABS */}
            <Tabs
              options={tabOptions}
              optionActions={[null, handleEditorTabClick]}
            >
              <Tab key={t_withCollaborators}>
                <Kanban
                  {...commonProps}
                  currentSplit={props.workpiece.rightSplit}
                  archivedSplits={props.workpiece.archivedSplits}
                />
              </Tab>
              <Tab key={t_withEditor}>
                <Kanban {...commonProps} />
              </Tab>
            </Tabs>
          </main>
        </div>
      )}
    </>
  );
};

export default Summary;
