// import Collaborator from './collaborator/collaborator';
import { useHistory, useParams } from 'react-router-dom';

const Privacy = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/privacy`);
  const t_title = '';
  return (
    <div className="consultRightSplitSection">
      <div
        className="titleRow"
        style={{
          borderBottom: '1px solid #dcdfe1',
          paddingBottom: '16px',
          marginBottom: '0px',
        }}
      >
        <div className="title">Privacy</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            modifier
          </button>
        )}
      </div>
      <div />
      {props.rightSplitInConsultation.privacy.map((collaborator, id) => (
        <Collab
          key={collaborator.rightHolder_id}
          {...props}
          collaborator={collaborator}
        />
      ))}
    </div>
  );
};

const Collab = (props) => {
  console.log(props.collaborator);
  const { vote, rightHolder } = props.collaborator;
  const { firstName, lastName } = rightHolder;
  const t_name = `${firstName} ${lastName}`;
  const t_initials = `${firstName[0]}${lastName[0]}`;
  const t_vote = props.collaborator.vote;
  const handleAccept = () =>
    props.setPrivacy({
      vote: 'accepted',
      comment: '',
    });
  const handleReject = () =>
    props.setPrivacy((prevState) => ({ ...prevState, vote: 'rejected' }));
  const handleCommentChange = (e) =>
    props.setPrivacy((prevState) => ({
      ...prevState,
      comment: e.target.value,
    }));
  const user_id = localStorage.getItem('user_id');
  const isUserVoting =
    user_id === props.collaborator.rightHolder_id && vote === 'undecided';
  return (
    <div>
      <div className="consultCollaborator privacyCollaborator">
        <div className="left">
          <div className="avatar">{t_initials}</div>
          <div className="name">{t_name}</div>
        </div>

        <div className="right">
          {vote === 'accepted' && (
            <div className="voteAccepted">{`${t_vote}`}</div>
          )}
          {vote === 'rejected' && (
            <div className="voteRejected">{`${t_vote}`}</div>
          )}
          {vote === 'undecided' && (
            <div className="voteUndecided">{`${t_vote}`}</div>
          )}
        </div>
      </div>

      {props.voting && isUserVoting && (
        <div className="voting">
          <div className="buttons">
            <button
              onClick={handleReject}
              className={`reject ${
                props.privacy.vote === 'rejected' ? 'rejectSelected' : ''
              }`}
            >
              No
            </button>
            <button
              onClick={handleAccept}
              className={`accept ${
                props.privacy.vote === 'accepted' ? 'acceptSelected' : ''
              }`}
            >
              Yes
            </button>
          </div>
          {props.privacy.vote === 'rejected' && (
            <textarea
              value={props.privacy.comment}
              onChange={handleCommentChange}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Privacy;
