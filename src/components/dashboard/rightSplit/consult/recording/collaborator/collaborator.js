// import Vote from '../vote/vote';

const Collaborator = (props) => {
  const { shares, vote, function: _function, rightHolder } = props.collaborator;
  const { firstName, lastName } = rightHolder;
  const handleAccept = () => props.setRecording('accepted');
  const handleReject = () => props.setRecording('rejected');
  const user_id = localStorage.getItem('user_id');
  const isUserVoting = user_id === props.collaborator.user_id && vote === 'undecided';
  return (
    <>
      <div className="consultCollaborator">
        <div className="left">
          <div className="avatar" />
          <div>
            <div className="name">{`${firstName} ${lastName}`}</div>
            <div className="roles">
              {' '}
              {_function}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="shares">{`${shares} %`}</div>
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
            className={`reject ${
              props.recording === 'rejected' ? 'rejectSelected' : ''
            }`}
          >
            No
          </button>
          <button
            onClick={handleAccept}
            className={`accept ${
              props.recording === 'accepted' ? 'acceptSelected' : ''
            }`}
          >
            Yes
          </button>
        </div>
      )}
    </>
  );
};

export default Collaborator;