import Collaborator from "./collaborator/collaborator"

const Collaborators = (props) => {
  return (
    <> 
      {props.performance.map((el, id) => {
        // Incomming data is different than PostingData
        const collaborator = typeof el.rightHolder === 'string'
          ? props.collaborators.find(EL => EL.user_id === el.rightHolder)
          : el.rightHolder
        return (<Collaborator key={collaborator.user_id} {...props} el={el} id={id} collaborator={collaborator} />)
      })}
    </>
  )
}

export default Collaborators