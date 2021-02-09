// import {useState} from "react"
// import deleteWorkpiece from "../../../../api/workpieces/deleteWorkpiece"
// import patchWorkpiece from "../../../../api/workpieces/patchWorkpiece"
import Action from "./action/action"

const Workpiece = (props) => {
  // const [newTitle,setNewTitle] = useState("") 
  // const handleInput = (e)=>setNewTitle(e.target.value) 
  // const handlePatch = async ()=>{
  //   await patchWorkpiece({workpiece_id : props.workpiece_id, title : newTitle})
  //   setNewTitle("")
  //   props.resetData()
  // } 
  // const handleDelete = async ()=>{
  //   await deleteWorkpiece({workpiece_id : props.workpiece_id})
  //   props.resetData()
  // } 
  return ( 
    <div className="workpiece">   
      <div className="left"> 
        <div className="img"/>

        <div className="details"> 
          <div className="b1"> 
            <span className="title">{props.title + " "}</span>
            <span>par</span>
            <span>{" " + props.owner.firstName + " " + props.owner.lastName}</span>
          </div>
          <div className="b2">  
            <span>Modifié il y a </span>
            <span className="time">-----</span>
            {" - Partagé avec "} 
            <span className="collaborators">-----</span>
          </div>
        </div>
      </div>

      <div className="progress"/>
      <div className="credit"/>  
      <div className="right"> 
        <Action {...props}/>
        <div className="ellipsis"/> 
      </div>
    </div>
  ) 
}

export default Workpiece