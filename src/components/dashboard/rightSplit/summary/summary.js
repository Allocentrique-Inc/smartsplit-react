import { useState, useEffect } from 'react';
import TopBar from './topBar/topBar';
import submitRightSplit from '../../../../api/workpieces/submitRightSplit';
import Consult from '../consult/consult';
import X from '../../../../icons/x';

const Summary = (props) => {
  const [consulting, setConsulting] = useState(null);
  const [emails, setEmails] = useState(false);
  const [isAdjustingEmails, setIsAdjustingEmails] = useState(null);
  if (
    !props.workpiece.rightSplit ||
    !props.workpiece.rightSplit._state ||
    !props.workpiece.archivedSplits
  ) {
    return null;
  }
  const user_id = localStorage.getItem('user_id');

  const handleSubmitRightSplit = async (e) => {
    e.stopPropagation();
    await submitRightSplit({
      workpiece_id: props.workpiece.workpiece_id,
      emails,
    });
    setConsulting(null);
    setEmails(false);
    props.resetData();
  };

  const hasToVote = [
    ...props.workpiece.rightSplit.copyright,
    ...props.workpiece.rightSplit.performance,
    ...props.workpiece.rightSplit.recording,
  ]
    .filter((el) => el.rightHolder.user_id === user_id)
    .some((el) => el.vote === 'undecided');

  const t_title =
    props.translations.rightSplit.summary.adjustEmail._title[props.language];
  const t_presentation =
    props.translations.rightSplit.summary.adjustEmail._presentation[
      props.language
    ];
  const t_envoyer =
    props.translations.rightSplit.summary.adjustEmail._send[props.language];
  const t_annuler =
    props.translations.rightSplit.summary.adjustEmail._cancel[props.language];

  const allArrays = [
    ...props.copyright,
    ...props.performance,
    ...props.recording,
    props.label.rightHolder_id ? props.label : '',
  ].filter((el) => el !== '');
  const allActors = [];
  allArrays.forEach((el) => {
    if (!allActors.find((EL) => EL.rightHolder_id === el.rightHolder_id)) {
      allActors.push(el);
    }
  });

  console.log(emails);

  useEffect(() => {
    const alfa = {};
    allActors.forEach((el) => {
      console.log(el);
      const { emails } = el.rightHolder;
      alfa[el.rightHolder_id] = emails[0];
    });
    setEmails(alfa);
  }, []);

  const commonProps = {
    handleSubmitRightSplit,
    setConsulting,
    hasToVote,
  };
  return (
    <>
      {/* CONSULT */}
      {consulting &&
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        (isAdjustingEmails ? (
          <div
            className="modalBackground"
            onClick={() => {
              setConsulting(null);
              setIsAdjustingEmails(false);
            }}
          >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="topBar">
                <div className="title">{t_title}</div>
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
              <div className="content adjustEmails">
                <div>{t_presentation}</div>
                <div>
                  {allActors.map((el) => (
                    <div>
                      <div>{`${el.rightHolder.firstName} ${el.rightHolder.lastName}`}</div>
                      <input
                        value={emails[el.rightHolder_id]}
                        onChange={(e) => {
                          const alfa = { ...emails };
                          alfa[el.rightHolder_id] = e.target.value;
                          setEmails(alfa);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="downBar">
                <button
                  className="btn-secondary"
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    setConsulting(null);
                    setIsAdjustingEmails(false);
                  }}
                >
                  {t_annuler}
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSubmitRightSplit}
                >
                  {t_envoyer}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="modalBackground" onClick={() => setConsulting(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="topBar">
                <div className="title">Version 1</div>
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
                {consulting._state === 'draft' && (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setIsAdjustingEmails(true);
                    }}
                  >
                    Envoyer aux collaborateurs
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
            <div className="pageTitle">Résumé du partage</div>

            <div className="splitDetails">
              Créé par
              <span className="artistName">
                {`${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName}`}
              </span>
              {/* - Mis à jour
              <span className="lastModify">-------</span> */}
            </div>

            <div className="b1b1b2">
              {/* DRAFT */}
              <div className="bx">
                <div className="colTitle">En attente d'envoi</div>
                <div className="content">
                  {props.workpiece.rightSplit._state === 'draft' && (
                    <DraftRightSplit {...commonProps} {...props} isDraft />
                  )}
                </div>
              </div>

              {/* INVOTE */}
              <div className="bx">
                <div className="colTitle">En attente de décision</div>
                <div className="content">
                  {props.workpiece.rightSplit._state === 'voting' && (
                    <InVoteRightSplit {...commonProps} {...props} />
                  )}
                </div>
              </div>

              {/* DECIDED */}
              <div className="bx">
                <div className="colTitle">Décidés</div>
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
                    props.workpiece.archivedSplits.map((el, id) => (
                      <RejectedRightSplit id={id} el={el} />
                    ))}
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

const DraftRightSplit = (props) => (
  <div
    className="rightSplit"
    onClick={() => props.setConsulting(props.workpiece.rightSplit)}
  >
    <div className="title">Version X</div>
    <div className="details">
      Créé par
      <span className="artistName">
        {` ${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName} `}
      </span>
      {/* il y a ------- */}
    </div>
    <div className="b1">
      <div className="collaborators" />
    </div>
    <div className="border" />
    <button>Send to collab</button>
  </div>
);

const AcceptedRightSplit = (props) => (
  <div
    className="rightSplit"
    onClick={() => props.setConsulting(props.workpiece.rightSplit)}
  >
    <div className="title">Version X</div>
    <div className="details">
      Créé par
      <span className="artistName">
        {` ${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName} `}
      </span>
      {/* il y a ------- */}
    </div>
    <div className="b1">
      <div className="collaborators" />
      <div className="status acceptedStatus">Accepté</div>
    </div>
    <div className="border" />
    <button
      // onClick={props.handleConsultBtn}
      disabled
    >
      Téléchargé l'entente
    </button>
  </div>
);

const InVoteRightSplit = (props) => (
  <div
    className="rightSplit"
    onClick={() => props.setConsulting(props.workpiece.rightSplit)}
  >
    <div className="title">Version X</div>
    <div className="details">
      Créé par
      <span className="artistName">
        {` ${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName} `}
      </span>
      {/* il y a ------- */}
    </div>
    {/* <div className="b1">
      <div className="collaborators" />
    </div> */}
    <button>Consulter</button>
  </div>
);

const RejectedRightSplit = (props) => (
  <div
    className="rightSplit"
    onClick={() => props.setConsulting(props.workpiece.rightSplit)}
  >
    <div className="title">Version X</div>
    <div className="details">
      Créé par
      <span className="artistName">
        {` ${props.workpiece.owner.firstName} ${props.workpiece.owner.lastName} `}
      </span>
      {/* il y a ------- */}
    </div>
    <div className="b1">
      <div className="collaborators" />
      <div className="status rejectedStatus">Refusé</div>
    </div>
  </div>
);
