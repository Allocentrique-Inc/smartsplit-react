import Collaborator from './collaborator/collaborator';

const Collaborators = (props) => (
  <>
    {props.recording.map((collaborator, id) => (
      <Collaborator
        key={collaborator.rightHolder_id}
        {...props}
        collaborator={collaborator}
        id={id}
      />
    ))}
  </>
);

export default Collaborators;
