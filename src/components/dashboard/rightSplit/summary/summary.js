import { useState } from 'react';
import TopBar from './topBar/topBar';
import submitRightSplit from '../../../../api/workpieces/submitRightSplit';
import Consult from '../consult/consult';

const Summary = (props) => {
  const [isConsulting, setIsConsulting] = useState(false);
  if (
    !props.workpiece.rightSplit
    || !props.workpiece.rightSplit._state
    || !props.workpiece.archivedSplits
  ) {
    return null;
  }
  const user_id = localStorage.getItem('user_id');

  const handleConsultBtn = () => {
    setIsConsulting((e) => !e);
  };

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
    handleConsultBtn,
    hasToVote,
  };
  return (
    <>
      {/* CONSULT */}
      {isConsulting && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="modalBackground" onClick={handleConsultBtn}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="topBar">Top Bar</div>
            <div style={{ overflowY: 'auto' }}>
              <Consult
                {...props}
                voting={hasToVote}
                modifiable={props.workpiece.rightSplit._state === 'draft'}
              />
            </div>
            <div className="downBar">Down Bar</div>
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
  <div className="rightSplit" onClick={props.handleConsultBtn}>
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
      <div className="status">Accepté</div>
    </div>
    <div className="border" />
    <button onClick={props.handleSubmitRightSplit}>Send to collab</button>
  </div>
);

const AcceptedRightSplit = (props) => (
  <div className="rightSplit" onClick={props.handleConsultBtn}>
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
  <div className="rightSplit" onClick={props.handleConsultBtn}>
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
      {/* <div className="status">Accepté</div>  */}
    </div>
    {/* <div className="border"/>  */}
    {/* <button onClick={props.handleConsultBtn}>
        Téléchargé l'entente
      </button>  */}
  </div>
);

const RejectedRightSplit = (props) => (
  <div className="rightSplit" onClick={props.handleConsultBtn}>
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
    {/* <div className="border" />
      <button onClick={props.handleConsultBtn}>
        Téléchargé l'entente
      </button> */}
  </div>
);
