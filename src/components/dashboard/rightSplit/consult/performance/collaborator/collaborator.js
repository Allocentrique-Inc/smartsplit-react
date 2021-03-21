import Avatar from '../../../../_/avatar/avatar';
import colors from '../../../_/colors';

const Collaborator = (props) => {
  const { shares, vote, roles, rightHolder, comment } = props.collaborator;
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
              className={`reject ${
                props.performance.vote === 'rejected' ? 'rejectSelected' : ''
              }`}
            >
              {props.t_no}
            </button>
            <button
              onClick={handleAccept}
              className={`accept ${
                props.performance.vote === 'accepted' ? 'acceptSelected' : ''
              }`}
            >
              {props.t_yes}
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
