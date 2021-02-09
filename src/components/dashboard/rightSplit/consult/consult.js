import Copyright from "./copyright/copyright"
import Performance from "./performance/performance"
import Recording from "./recording/recording"
import Privacy from "./privacy/privacy" 

const Consult = (props) => {
  if(
    !props.workpiece ||
    !props.workpiece.rightSplit
  ){return null}
  return (
    <div> 
      <Copyright {...props}/>
      <Performance {...props}/>
      <Recording {...props}/>
      <Privacy {...props}/> 
    </div>
  )
}

export default Consult