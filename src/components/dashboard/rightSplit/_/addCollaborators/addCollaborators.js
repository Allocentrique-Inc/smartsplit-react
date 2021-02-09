import {useState} from "react"
import postCollaborator from "../../../../../api/users/postCollaborator"

const AddCollaborators = (props) => {
  const [isAdding, setIsAdding] = useState(false)  
  const [isCreating, setIsCreating] = useState(false)  
  console.log(props.collaborators)
  const availablesCollaborators = props.collaborators.filter( (el)=>  !props.preSelectedCollaborators.some((EL)=> EL.rightHolder === el.user_id) )
  return (
    <div>
      {!isAdding&&<button onClick={()=>{setIsAdding(true)}}>
        AddCollaborators
      </button>}

      {isAdding&&<div>
        {availablesCollaborators.map((el,id)=>{
          return (
            <div key={el.user_id}>
              <button onClick={()=>{
                setIsAdding(false)
                props.addCollaborators(el.user_id)
              }}>
                {el.firstName + " " + el.lastName}
              </button>
            </div>
          )
        })}
        <div> 
          <button onClick={()=>{setIsCreating(true)}}>
            Créer un nouveau collaborateur
          </button>
        </div>
        <div>
          <button onClick={()=>{setIsAdding(false)}}>
            Cancel (should be on click out)
          </button>
        </div>
      </div>}
      {isCreating&&<CreateNewCollaborator {...props} setIsCreating={setIsCreating}/>}
    </div>
  )
}

const CreateNewCollaborator = (props) => {
  const user_id = localStorage.getItem("user_id")
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [email,setEmail] = useState("")
  return (
    <div>
      <div>Ajouter / Modifier un collaborateur</div>
      <div>
        First Name
        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
      </div>
      <div>
        Last Name
        <input value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
      </div>
      <div>
        Email
        <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      <div>
        <button onClick={()=>{props.setIsCreating(false)}}>
          Annuler
        </button>
        <button
          onClick={ async ()=>{
            await postCollaborator({
              firstName,
              lastName,
              email,
              user_id 
            }) 
            await props.resetData()
            props.setIsCreating(false)
          }}
        >
          Sauvegarder
        </button>
      </div>
    </div>
  )
}

export default AddCollaborators