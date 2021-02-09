import {useState, useEffect} from "react"
import getUsersCollaborators from "../../../api/users/getUsersCollaborators"
import postRightSplit from "../../../api/workpieces/postRightSplit"
import getWorkpiece from "../../../api/workpieces/getWorkpiece" 
import getUsers from "../../../api/users/getUsers"
import Copyright from "./copyright/copyright"
import Performance from "./performance/performance"
import Recording from "./recording/recording"
import Privacy from "./privacy/privacy"
import Kanban from "./kanban/kanban"
import Consult from "./consult/consult"
import Vote from "./vote/vote"
import { 
  useParams,
  Route
} from "react-router-dom";


const RightSplit = (props) => {
  let { workpiece_id } = useParams(); 
  const user_id = localStorage.getItem("user_id")
  const [copyright,setCopyright] = useState([])
  const [performance,setPerformance] = useState([])
  const [recording,setRecording] = useState([])
  const [privacy,setPrivacy] = useState("private")
  const [collaborators,setCollaborators] = useState([])
  const [workpiece,setWorkpiece] = useState([]) 

  const resetData = async () => { 
    const incomingWorkpiece = await getWorkpiece({ workpiece_id })
    if(incomingWorkpiece.rightSplit){ 
      const {copyright, performance, recording} = incomingWorkpiece.rightSplit 
      setCopyright( copyright )
      setPerformance( performance )
      setRecording( recording )
    } 

    setWorkpiece(incomingWorkpiece)
    const collaborators = await getUsersCollaborators({ user_id })
    const user = await getUsers({ user_id })
    setCollaborators([user,...collaborators]) 
  }
  useEffect(()=>{
    resetData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const saveRightSplit = async () => { 
    const payload = {workpiece_id, copyright, performance, recording }
    await postRightSplit(payload) 
  }

  const commonProps = {
    copyright,setCopyright,
    performance,setPerformance,
    recording,setRecording,
    privacy,setPrivacy,
    collaborators,setCollaborators,
    workpiece,setWorkpiece, 
    resetData,
    saveRightSplit
  }  

  return (
    <>
      <Route path="/workpiece/:workpiece_id/right-split/consult">
        <Consult {...commonProps} voting={true}/>
      </Route>  
      <Route path="/workpiece/:workpiece_id/right-split/copyright">
        <Copyright {...commonProps}/>
      </Route>  
      <Route path="/workpiece/:workpiece_id/right-split/performance">
        <Performance {...commonProps}/>
      </Route>  
      <Route path="/workpiece/:workpiece_id/right-split/recording">
        <Recording {...commonProps}/>
      </Route>  
      <Route path="/workpiece/:workpiece_id/right-split/privacy">
        <Privacy {...commonProps}/>
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/kanban">
        <Kanban {...commonProps}/>
      </Route>
      <Route path="/workpiece/:workpiece_id/right-split/vote">
        <Vote {...commonProps}/>
      </Route>
    </>
  )
}

export default RightSplit