import { useState } from 'react';
import PenIcon from '../../../../icons/pen';

const AddWorkpieceButton = (props) => {
  const [isAdding, setIsAdding] = useState(false);
  // const handleToggleAdding = () => setIsAdding(e => !e)

  return (
    <div>
      <button
        onClick={() => props.setIsAdding((e) => !e)}
        className="addButton"
      >
        {' '}
        AJOUTER
        <PenIcon />
      </button>
    </div>
  );
};

// const Adding = (props) => {
//   const [newTitle, setNewTitle] = useState("")
//   const handleInput = (e) => setNewTitle(e.target.value)
// const handleConfirm = async () => {
//   await postWorkpiece({
//     title: newTitle
//   })
//   setNewTitle("")
//   props.resetData()
// }
//   return (
//     <div>
//       <input value={newTitle} onChange={handleInput} />
//       <button onClick={handleConfirm}> postWorkpiece </button>
//     </div>
//   )
// }

export default AddWorkpieceButton;
