// import Collaborator from './collaborator/collaborator';
import { useHistory, useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Eye from './eye';
import Avatar from '../../../_/avatar/avatar';
import colors from '../../_/colors';
import ArtistName from '../../../_/artistName/artistName';
import Pen from '../../../../../icons/pen';

const Privacy = (props) => {
  const history = useHistory();
  const { workpiece_id } = useParams();
  const handleButton = () =>
    history.push(`/workpiece/${workpiece_id}/right-split/privacy`);
  const t_title = '';
  const t_privacyState = props.isPublic ? props.t_public : props.t_private;

  const user = props.workpiece.owner;
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
          <button className="btn-secondary-small" onClick={handleButton}>
            <Pen color="#2DA84F" size={16} />
            {props.t_modify}
          </button>
        )}
      </div>
      <div className="privacySubtitle">
        <div>
          <Eye />
        </div>
        <div>
          {`${artistName} ${props.t_privacySubtitle}`}
          <b> {t_privacyState}</b>
          {!props.isMobile && props.isPublic && (
            <p className="privacyPublicDesc">
              <b>{artistName}</b> {props.t_privacyDescription}
            </p>
          )}
        </div>
      </div>

      <div />
      {props.privacy.map((collaborator, id) => (
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
    props.setVote('privacy', {
      vote: 'accepted',
      comment: '',
    });
  const handleReject = () =>
    props.setVote('privacy', { vote: 'rejected', comment: '' });
  const handleCommentChange = (e) =>
    props.setVote('privacy', {
      vote: 'rejected',
      comment: e.target.value,
    });
  const user_id = localStorage.getItem('user_id');
  const isUserVoting =
    user_id === props.collaborator.rightHolder_id && vote === 'undecided';

  const collaboratorColor =
    colors[
      props.activeCollaboratorIds.indexOf(props.collaborator.rightHolder_id)
    ];

  const isYou = props.user.user_id === props.collaborator.rightHolder.user_id;

  // TEXTS
  const t_you = { fr: '(toi)', en: '(you)' }[props.language];
  return (
    <div>
      <div className="consultCollaborator privacyCollaborator">
        <Avatar user={rightHolder} color={collaboratorColor} />
        <div className="infos">
          <div className="row">
            <div>
              <ArtistName
                className="name"
                user={props.collaborator.rightHolder}
              />
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
                    props.votes.privacy.vote === 'rejected'
                      ? 'rejectSelected'
                      : ''
                  }`}
                >
                  {props.t_no}
                </button>
                <button
                  onClick={handleAccept}
                  className={`accept ${
                    props.votes.privacy.vote === 'accepted'
                      ? 'acceptSelected'
                      : ''
                  }`}
                >
                  {props.t_yes}
                </button>
              </div>
              {props.votes.privacy.vote === 'rejected' && (
                <textarea
                  value={props.votes.privacy.comment}
                  onChange={handleCommentChange}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Privacy;
