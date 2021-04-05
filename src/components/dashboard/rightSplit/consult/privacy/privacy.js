// import Collaborator from './collaborator/collaborator';
import { useHistory, useParams } from 'react-router-dom';
import Eye from './eye';
import Avatar from '../../../_/avatar/avatar';
import colors from '../../_/colors';
import ArtistName from '../../../_/artistName/artistName';

const Privacy = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/privacy`);
  const t_title = '';
  console.log(props.rightSplitInConsultation.isPublic);
  const t_privacyState = props.rightSplitInConsultation.isPublic
    ? props.t_public
    : props.t_private;

  console.log(props.rightSplitInConsultation.owner);
  const user = props.rightSplitInConsultation.owner || null;
  const artistName = user
    ? user.artistName
      ? user.artistName
      : `${user.firstName} ${user.lastName}`
    : null;
  return (
    <div className="consultRightSplitSection">
      <div
        className="titleRow"
        style={{
          // borderBottom: '1px solid #dcdfe1',
          paddingBottom: '16px',
          marginBottom: '0px',
        }}
      >
        <div className="title">{props.t_privacy}</div>
        {!props.voting && props.modifiable && (
          <button className="btn-secondary" onClick={handleButton}>
            {props.t_modify}
          </button>
        )}
      </div>
      <div className="privacySubtitle">
        <Eye />
        <ArtistName user={props.rightSplitInConsultation.owner} />
        {'\u00A0'}
        {`${props.t_privacySubtitle}`}
        {'\u00A0'}
        <b> {t_privacyState}</b>
      </div>
      {props.rightSplitInConsultation.isPublic && (
        <div className="privacyDescription">
          {`${artistName} ${props.t_privacyDescription}`}
        </div>
      )}
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
  const { vote, rightHolder, comment } = props.collaborator;
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

  const collaboratorColor =
    colors[
      props.activeCollaboratorsIds.indexOf(props.collaborator.rightHolder_id)
    ];

  const isYou = props.user.user_id === props.collaborator.rightHolder.user_id;

  // TEXTS
  const t_you = { fr: '(toi)', en: '(you)' }[props.language];
  return (
    <div>
      <div className="consultCollaborator privacyCollaborator">
        <div className="left">
          <Avatar user={rightHolder} color={collaboratorColor} />
          <ArtistName className="name" user={props.collaborator.rightHolder} />
          {isYou && `\u00A0${t_you}`}
        </div>

        <div className="right">
          {vote === 'accepted' && (
            <div className="voteAccepted">{props.t_accepted}</div>
          )}
          {vote === 'rejected' && (
            <div className="voteRejected">{props.t_rejected}</div>
          )}
          {vote === 'undecided' && (
            <div className="voteUndecided">{props.t_undecided}</div>
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
                props.privacy.vote === 'rejected' ? 'rejectSelected' : ''
              }`}
            >
              {props.t_no}
            </button>
            <button
              onClick={handleAccept}
              className={`accept ${
                props.privacy.vote === 'accepted' ? 'acceptSelected' : ''
              }`}
            >
              {props.t_yes}
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
