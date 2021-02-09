import { useEffect, useState } from "react"
import getWorkpiece from "../../../api/workpieces/getWorkpiece"
import { useParams, Link } from "react-router-dom"; 
import Tile from "./tile/tile"

const Orientation = (props) => {
  let { workpiece_id } = useParams();
  const [workpiece, setWorkpiece] = useState("")
  const [tab,setTab] = useState("task")

  const resetData = async () => {
    const incomingWorkpiece = await getWorkpiece({
      workpiece_id
    })
    setWorkpiece(incomingWorkpiece)
  }

  const commonProps = {
    workpiece, 
    resetData,
    workpiece_id
  }

  useEffect(() => {
    resetData()
    // eslint-disable-next-line
  }, [props.selectedWorkpiece])
  console.log(commonProps) 
  if(!workpiece)return null
  return (
    <div className="orientation">
      <div className="b1">
        <div className="content">
          <div className="b1">
            <div className="back">
              <Link to={`/`}>
                BACK
              </Link>
            </div>
            <div className="right">
              <div className="credit" />
              <div className="profile" />
            </div>
          </div>

          <div className="b2">
            <div className="left">
              <div className="image">
                Image
              </div>
              <div className="description">
                <div className="title">
                  {workpiece.title}
                  <div className="modify"/>
                </div>
                <div className="details"> 
                  { "--------- créé par  "}
                  <span className="artistName">
                    {workpiece.owner.firstName 
                    + " " + 
                    workpiece.owner.lastName}
                  </span>
                  {
                    " - Mis à jour --------" 
                  }
                </div>
              </div>
            </div>
            <div className="right">
              Collaborators
            </div>
          </div>
          <div className="b3">
            <button 
              className={"tab "+(tab==="task"?"selectedTab":"")} 
              onClick={()=>{setTab("task")}}  
            >
              Taches
            </button>
            <span className="space"/>
            <button 
              className={"tab "+(tab==="file"?"selectedTab":"")} 
              onClick={()=>{setTab("file")}}  
            >
              Fichier
            </button>  
          </div>
        </div>
      </div>


      <div className="b2">
        <div className="tileSection"> 
          <Tile tileId="share" {...props} {...commonProps}/>
          <div className="space" /> 
          <Tile tileId="document" {...props} {...commonProps}/>
          <div className="space" /> 
          <Tile tileId="protect" {...props} {...commonProps}/>
          <Tile tileId="" {...props} {...commonProps}/>
          <div className="space" />
          <Tile tileId="" {...props} {...commonProps}/> 
        </div>
      </div>
    </div>
  )
}

export default Orientation