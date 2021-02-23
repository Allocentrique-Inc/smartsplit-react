// import Vote from '../vote/vote';

const Collaborator = (props) => {
  const {
    shares,
    vote,
    function: _function,
    rightHolder,
    comment,
  } = props.collaborator;
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
  let handleCommentChange;
  let commentValue;
  if (isLabel) {
    isAccepted = props.label.vote === 'accepted';
    isRejected = props.label.vote === 'rejected';
    handleAccept = () =>
      props.setLabel((prevState) => ({ ...prevState, vote: 'accepted' }));
    handleReject = () =>
      props.setLabel((prevState) => ({ ...prevState, vote: 'rejected' }));
    handleCommentChange = (e) =>
      props.setLabel((prevState) => ({
        ...prevState,
        comment: e.target.value,
      }));
    commentValue = props.label.comment;
  } else {
    isAccepted = props.recording.vote === 'accepted';
    isRejected = props.recording.vote === 'rejected';
    handleAccept = () =>
      props.setRecording({
        vote: 'accepted',
        comment: '',
      });
    handleReject = () =>
      props.setRecording((prevState) => ({ ...prevState, vote: 'rejected' }));
    handleCommentChange = (e) =>
      props.setRecording((prevState) => ({
        ...prevState,
        comment: e.target.value,
      }));
    commentValue = props.recording.comment;
  }
  console.log(isLabel, props.label, isRejected);
  return (
    <>
      <div className="consultCollaborator">
        <div className="left">
          <div className="avatar">{t_initials}</div>
          <div>
            <div className="name">{`${firstName} ${lastName}`}</div>
            <div className="roles"> {_function}</div>
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
      {!props.voting && !isUserVoting && comment && (
        <div className="comment">
          <div>Commentaire</div>
          {comment}
        </div>
      )}
      {props.voting && isUserVoting && (
        <div className="voting">
          <div className="buttons">
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
          {isRejected && (
            <textarea
              value={props.recording.comment}
              onChange={handleCommentChange}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Collaborator;
