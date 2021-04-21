import Avatar from '../../../../_/avatar/avatar';
import colors from '../../../_/colors';
import ArtistName from '../../../../_/artistName/artistName';

const Collaborator = (props) => {
  const {
    collaborator,
    collaboratorType,
    votes,
    setVote,
    translations,
    language,
  } = props;
  const { firstName, lastName } = collaborator.rightHolder;
  const handleAccept = () =>
    props.setVote(collaboratorType, {
      vote: 'accepted',
      comment: '',
    });
  const handleReject = () =>
    props.setVote(collaboratorType, { vote: 'rejected', comment: '' });
  const handleCommentChange = (e) =>
    props.setVote(collaboratorType, {
      vote: 'rejected',
      comment: e.target.value,
    });
  const user_id = localStorage.getItem('user_id');
  const isUserVoting =
    user_id === collaborator.rightHolder_id &&
    collaborator.vote === 'undecided';

  const collaboratorColor =
    colors[
      props.activeCollaboratorIds.indexOf(props.collaborator.rightHolder_id)
    ];
  const isYou = props.user.user_id === props.collaborator.rightHolder.user_id;
  const agreementDuration = {
    fr: 'Entente',
    en: 'Agreement',
  }[language];
  const printRoles = () => {
    let print = '';
    switch (collaboratorType) {
      case 'copyright':
        collaborator.roles.forEach((role, index) => {
          print += translations.rightSplit.copyrightRoles[`_${role}`][language];
          if (index !== collaborator.roles.length - 1) {
            print += ', ';
          }
        });
        return print;

      case 'performance':
        print +=
          translations.rightSplit.performanceStatus[`_${collaborator.status}`][
            language
          ];
        print += ', ';
        collaborator.roles.forEach((role, index) => {
          print +=
            translations.rightSplit.performanceRoles[`_${role}`][language];
          if (index !== collaborator.roles.length - 1) {
            print += ', ';
          }
        });
        return print;
      case 'recording':
        print =
          translations.rightSplit.recordingFunctionOptions[
            `_${collaborator.function}`
          ][language];
        return print;
      case 'label':
        print = (
          <div>
            <p>Label</p>
            <p>
              {`${agreementDuration}: 
                            ${
                              translations.rightSplit
                                .recordingLabelDealTimeLapse[
                                `_${collaborator.agreementDuration}`
                              ][language]
                            }
                            `}
            </p>
          </div>
        );
        return print;
      default:
    }
  };

  // TEXTS
  const t_you = { fr: '(toi)', en: '(you)' }[language];
  return (
    <>
      <div className="consultCollaborator">
        <Avatar user={collaborator.rightHolder} color={collaboratorColor} />
        <div className="infos">
          <div className="row">
            <div>
              <ArtistName className="name" user={collaborator.rightHolder} />
              {isYou && `\u00A0${t_you}`}
              <div className="roles">{printRoles()}</div>
            </div>
            <div className="right">
              <div className="shares">
                {`${collaborator.shares.toFixed(1)} %`}
              </div>
              {collaborator.vote === 'accepted' && (
                <div className="voteAccepted">{props.t_accepted}</div>
              )}
              {collaborator.vote === 'rejected' && (
                <div className="voteRejected">{props.t_rejected}</div>
              )}
              {collaborator.vote === 'undecided' && (
                <div className="voteUndecided">{props.t_undecided}</div>
              )}
            </div>
          </div>
          {!props.voting && !isUserVoting && collaborator.comment && (
            <div className="comment">
              <div>{props.t_comments}</div>
              {collaborator.comment}
            </div>
          )}
          {props.voting && isUserVoting && (
            <div className="voting">
              <div className="buttons">
                <button
                  onClick={handleReject}
                  className={`reject ${
                    votes[collaboratorType].vote === 'rejected'
                      ? 'rejectSelected'
                      : ''
                  }`}
                >
                  {props.t_no}
                </button>
                <button
                  onClick={handleAccept}
                  className={`accept ${
                    votes[collaboratorType].vote === 'accepted'
                      ? 'acceptSelected'
                      : ''
                  }`}
                >
                  {props.t_yes}
                </button>
              </div>
              {votes[collaboratorType].vote === 'rejected' && (
                <textarea
                  value={votes[collaboratorType].comment}
                  onChange={handleCommentChange}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Collaborator;
