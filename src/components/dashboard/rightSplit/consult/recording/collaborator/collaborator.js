// import Vote from '../vote/vote';

const Collaborator = (props) => {
  const { shares, vote, function: _function, rightHolder } = props.collaborator;
  const { firstName, lastName } = rightHolder;
  const t_initials = `${firstName[0]} ${lastName[0]}`;
  const user_id = localStorage.getItem('user_id');
  const isUserVoting =
    user_id === props.collaborator.rightHolder_id && vote === 'undecided';

  const isLabel =
    props.rightSplitInConsultation.label.rightHolder_id ===
    props.collaborator.rightHolder_id;
  let isAccepted;
  let isRejected;
  let handleAccept;
  let handleReject;
  if (isLabel) {
    isAccepted = props.label === 'accepted';
    isRejected = props.label === 'rejected';
    handleAccept = () => props.setLabel('accepted');
    handleReject = () => props.setLabel('rejected');
  } else {
    isAccepted = props.recording === 'accepted';
    isRejected = props.recording === 'rejected';
    handleAccept = () => props.setRecording('accepted');
    handleReject = () => props.setRecording('rejected');
  }
  console.log(isLabel, props.label, isRejected);
  return (
    <>
      <div className="consultCollaborator">
        <div className="left">
          <div className="avatar">{t_initials}</div>
          <div>
            <div className="name">{`${firstName} ${lastName}`}</div>
            <div className="roles">
              {' '}
              {_function}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="shares">{`${shares.toFixed(1)} %`}</div>
          {vote === 'accepted' && (
            <div className="voteAccepted">{`${vote}`}</div>
          )}
          {vote === 'rejected' && (
            <div className="voteRejected">{`${vote}`}</div>
          )}
          {vote === 'undecided' && (
            <div className="voteUndecided">{`${vote}`}</div>
          )}
        </div>
      </div>
      {props.voting && isUserVoting && (
        <div className="voting">
          <button
            onClick={handleReject}
            className={`reject ${isRejected ? 'rejectSelected' : ''}`}
          >
            No
          </button>
          <button
            onClick={handleAccept}
            className={`accept ${isAccepted ? 'acceptSelected' : ''}`}
          >
            Yes
          </button>
        </div>
      )}
    </>
  );
};

export default Collaborator;
