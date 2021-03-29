import Avatar from '../../../../_/avatar/avatar';
import colors from '../../../_/colors';
import ArtistName from '../../../../_/artistName/artistName';

const Collaborator = (props) => {
  const {
    shares,
    vote,
    function: _function,
    rightHolder,
    comment,
  } = props.collaborator;
  const user_id = localStorage.getItem('user_id');
  const isUserVoting =
    user_id === props.collaborator.rightHolder_id && vote === 'undecided';

  const isLabel =
    props.rightSplitInConsultation.label &&
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

  const collaboratorColor =
    colors[
      props.activeCollaboratorsIds.indexOf(props.collaborator.rightHolder_id)
    ];
  return (
    <>
      <div className="consultCollaborator">
        <div className="left">
          <Avatar user={rightHolder} color={collaboratorColor} />
          <div>
            <div className="name"><ArtistName user={rightHolder} /></div>
            <div className="roles"> {_function}</div>
          </div>
        </div>
        <div className="right">
          <div className="shares">{`${shares.toFixed(1)} %`}</div>
          {vote === 'accepted' && (
            <div className="voteAccepted">{`${props.t_accepted}`}</div>
          )}
          {vote === 'rejected' && (
            <div className="voteRejected">{`${props.t_rejected}`}</div>
          )}
          {vote === 'undecided' && (
            <div className="voteUndecided">{`${props.t_undecided}`}</div>
          )}
        </div>
      </div>
      {!props.voting && !isUserVoting && comment && (
        <div className="comment">
          <div>${props.t_comments}</div>
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
              {props.t_no}
            </button>
            <button
              onClick={handleAccept}
              className={`accept ${isAccepted ? 'acceptSelected' : ''}`}
            >
              {props.t_yes}
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
