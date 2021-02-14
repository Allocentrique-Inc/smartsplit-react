import Collaborator from './collaborator/collaborator';

const Collaborators = (props) => (
  <>
    {props.recording.map((el, id) => {
      // Incomming data is different than PostingData
      const collaborator = typeof el.rightHolder === 'string'
        ? props.collaborators.find((EL) => EL.user_id === el.rightHolder)
        : el.rightHolder;
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

export default Collaborators;
