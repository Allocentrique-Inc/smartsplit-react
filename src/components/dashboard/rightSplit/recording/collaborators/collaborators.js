import Collaborator from "./collaborator/collaborator";

const Collaborators = (props) => {
  return (
    <>
      {props.recording.map((el, id) => {
        const collaborator = props.collaborators.find(
          (EL) => EL.user_id === el.rightHolder
        );
        if (!collaborator) return null;
        return (
          <Collaborator
            key={el.rightHolder}
            {...props}
            el={el}
            id={id}
            collaborator={collaborator}
          />
        );
      })}
    </>
  );
};

export default Collaborators;
