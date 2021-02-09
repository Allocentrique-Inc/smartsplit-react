import {useState} from "react"
import postWorkpiece from "../../../../api/workpieces/postWorkpiece"


const AddWorkpiece = (props) => {
  const [isAdding, setIsAdding] = useState(false)
  const handleToggleAdding = () => setIsAdding(e => !e)

  return (
    <div>
      <button onClick={handleToggleAdding} className="addButton"> AJOUTER </button> 
      {isAdding && <Adding {...props} /> }
    </div>
  )
}

const Adding = (props) => {
  const [newTitle, setNewTitle] = useState("")
  const handleInput = (e) => setNewTitle(e.target.value)
  const handleConfirm = async () => {
    await postWorkpiece({
      title: newTitle
    })
    setNewTitle("")
    props.resetData()
  }
  return (
    <div>
      <input value={newTitle} onChange={handleInput} />
      <button onClick={handleConfirm}> postWorkpiece </button>
    </div>
  )
}

export default AddWorkpiece