// import Vote from '../vote/vote';

const Collaborator = (props) => {
  const { shares, vote, roles, rightHolder } = props.collaborator;
  const { firstName, lastName } = rightHolder;
  const t_initials = `${firstName[0]} ${lastName[0]}`;
  const handleAccept = () =>
    props.setPerformance({ vote: 'accepted', comment: '' });

  const handleReject = () =>
    props.setPerformance((prevState) => ({ ...prevState, vote: 'rejected' }));
  const handleCommentChange = (e) =>
    props.setPerformance((prevState) => ({
      ...prevState,
      comment: e.target.value,
    }));
  const user_id = localStorage.getItem('user_id');
  const isUserVoting =
    user_id === props.collaborator.rightHolder_id && vote === 'undecided';
  return (
    <>
      <div className="consultCollaborator">
        <div className="left">
          <div className="avatar">{t_initials}</div>
          <div>
            <div className="name">{`${firstName} ${lastName}`}</div>
            <div className="roles">
              {roles.map((role) => (
                <div className="role" key={role}>
                  {role}
                </div>
              ))}
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
          <div className="buttons">
            <button
              onClick={handleReject}
              className={`reject ${
                props.performance.vote === 'rejected' ? 'rejectSelected' : ''
              }`}
            >
              No
            </button>
            <button
              onClick={handleAccept}
              className={`accept ${
                props.performance.vote === 'accepted' ? 'acceptSelected' : ''
              }`}
            >
              Yes
            </button>
          </div>
          {props.performance.vote === 'rejected' && (
            <textarea
              value={props.performance.comment}
              onChange={handleCommentChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Collaborator;
