import DraftRightSplit from '../../draftRightSplit/draftRightSplit';
import InVoteRightSplit from '../../inVoteRightSplit/inVoteRightSplit';
import AcceptedRightSplit from '../../acceptedRightSplit/acceptedRightSplit';
import RejectedRightSplit from '../../rejectedRightSplit/rejectedRightSplit';
import RejectedRightSplitArchived from '../../rejectedRightSplitArchived/rejectedRightSplitArchived';

const Kanban = (props) => {
  const {
    currentSplit = {},
    archivedSplits = {},
    t_waitingSubmit,
    t_waitingDecision,
    t_decided,
  } = props;
  return (
    <div className="kanban">
      {/* DRAFT */}
      <div className="column">
        <h4>{t_waitingSubmit}</h4>
        <div className="content">
          {currentSplit._state === 'draft' && (
            <DraftRightSplit {...props} {...props} />
          )}
        </div>
      </div>

      {/* INVOTE */}
      <div className="column">
        <h4>{t_waitingDecision}</h4>
        <div className="content">
          {currentSplit._state === 'voting' && (
            <InVoteRightSplit {...props} {...props} />
          )}
        </div>
      </div>

      {/* DECIDED */}
      <div className="column">
        <h4>{t_decided}</h4>
        <div className="content">
          {/* ACCEPTED */}
          {currentSplit._state === 'accepted' && (
            <AcceptedRightSplit {...props} {...props} />
          )}

          {/* REJECTED */}
          {currentSplit._state === 'rejected' && (
            <RejectedRightSplit {...props} {...props} />
          )}
          {props.workpiece.archivedSplits &&
            props.workpiece.archivedSplits.map((archivedRightSplit, id) => {
              return (
                <RejectedRightSplitArchived
                  id={id}
                  {...props}
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
