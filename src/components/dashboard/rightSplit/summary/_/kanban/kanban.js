const Kanban = (props) => {
  const {
    currentSplit,
    archivedSplits,
    t_waitingSubmit,
    t_waitingDecision,
    t_decided,
  } = props;
  console.log({ props });
  return (
    <div
      className="b1b1b2"
      //  style={{ display: tab !== 'withCollaborators' && 'none' }}
    >
      {/* DRAFT */}
      <div className="bx">
        <div className="colTitle">{t_waitingSubmit}</div>
        <div className="content">
          {currentSplit._state === 'draft' && (
            <DraftRightSplit {...commonProps} {...props} />
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
            props.workpiece.archivedSplits.map((archivedRightSplit, id) => {
              return (
                <RejectedRightSplitArchived
                  id={id}
                  {...commonProps}
                  archivedRightSplit={archivedRightSplit}
                  key={archivedRightSplit.version}
                  // workpiece={workpiece}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Kanban;
