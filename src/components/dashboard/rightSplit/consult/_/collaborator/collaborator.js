import Vote from '../vote/vote';
import ArtistName from '../../../../_/artistName/artistName';

const Collaborator = (props) => {
  const { shares, vote, roles } = props.collaborator;
  return (
    <div className="consultCollaborator">
      <div className="left">
        <div className="avatar" />
        <div>
          <div className="name"><ArtistName user={props.collaborator} /></div>
          <div className="roles">
            {roles.map((el) => (
              <div>{`${el} `}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="right">
        <div className="shares">{`${shares} %`}</div>
        {vote === 'accepted' && <div className="voteAccepted">{`${vote}`}</div>}
        {vote === 'rejected' && <div className="voteRejected">{`${vote}`}</div>}
        {vote === 'undecided' && (
          <div className="voteUndecided">{`${vote}`}</div>
        )}
      </div>
    </div>
  );
};

export default Collaborator;
