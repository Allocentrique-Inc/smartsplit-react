import { useState } from 'react';
import TopBar from './topBar/topBar';
import submitRightSplit from '../../../../api/workpieces/submitRightSplit';
import Consult from '../consult/consult';

const Summary = (props) => {
  const [consulting, setConsulting] = useState(null);
  if (
    !props.workpiece.rightSplit
    || !props.workpiece.rightSplit._state
    || !props.workpiece.archivedSplits
  ) {
    return null;
  }
  const user_id = localStorage.getItem('user_id');

  const handleSubmitRightSplit = async (e) => {
    e.stopPropagation();
    await submitRightSplit({ workpiece_id: props.workpiece.workpiece_id });
    props.resetData();
  };

  const hasToVote = [
    ...props.workpiece.rightSplit.copyright,
    ...props.workpiece.rightSplit.performance,
    ...props.workpiece.rightSplit.recording,
  ]
    .filter((el) => el.rightHolder.user_id === user_id)
    .some((el) => el.vote === 'undecided');

  const commonProps = {
    handleSubmitRightSplit,
    setConsulting,
    hasToVote,
  };
  return (
    <>
      {/* CONSULT */}
      {consulting && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="modalBackground" onClick={() => setConsulting(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="topBar">
              <div className="title">Version 1</div>
              <button className="exit" onClick={() => setConsulting(null)}>
                x
              </button>
            </div>
            <div className="content postSaveConsult">
              <Consult
                {...props}
                voting={false}
                modifiable={consulting._state === 'draft'}
              />
            </div>
            <div className="downBar">
              {/* <button className="btn-primary" onClick={() => {}}>
                Envoyer aux collaborateurs
              </button> */}
            </div>
          </div>
        </div>
      )}

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
              - Mis à jour
              <span className="lastModify">-------</span>
            </div>

            <div className="b1b1b2">
              {/* DRAFT */}
              <div className="bx">
                <div className="colTitle">En attente d'envoi</div>
                <div className="content">
                  {props.workpiece.rightSplit._state === 'draft' && (
                    <DraftRightSplit {...commonProps} {...props} />
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
                  {props.workpiece.archivedSplits
                    && props.workpiece.archivedSplits.map((el, id) => (
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
      il y a -------
    </div>
    <div className="b1">
      <div className="collaborators" />
    </div>
    <div className="border" />
    <button onClick={props.handleSubmitRightSplit}>Send to collab</button>
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
      il y a -------
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
      il y a -------
    </div>
    <div className="b1">
      <div className="collaborators" />
    </div>
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
      il y a -------
    </div>
    <div className="b1">
      <div className="collaborators" />
      <div className="status rejectedStatus">Refusé</div>
    </div>
  </div>
);
