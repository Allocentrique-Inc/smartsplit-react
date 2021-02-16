import Collaborator from './collaborator/collaborator';

const Collaborators = (props) => (
  <>
    {props.performance.map((collaborator, id) => (
      <Collaborator
        key={collaborator.user_id}
        {...props}
        id={id}
        collaborator={collaborator}
      />
    ))}
  </>
);

export default Collaborators;
