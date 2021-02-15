// import Vote from '../vote/vote';

const Collaborator = (props) => {
  const { firstName, lastName, shares, vote, roles } = props.collaborator;
  return (
    <>
      <div className="consultCollaborator">
        <div className="left">
          <div className="avatar" />
          <div>
            <div className="name">{`${firstName} ${lastName}`}</div>
            <div className="roles">
              {roles.map((el) => (
                <div>{`${el} `}</div>
              ))}
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
      {props.voting && (
        <div className="voting">
          <button className="reject">No</button>
          <button className="accept">Yes</button>
        </div>
      )}
    </>
  );
};

export default Collaborator;
