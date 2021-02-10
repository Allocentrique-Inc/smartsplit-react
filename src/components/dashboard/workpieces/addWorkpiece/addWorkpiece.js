import { useState } from 'react';
import postWorkpiece from '../../../../api/workpieces/postWorkpiece';

const AddWorkpiece = (props) => {
  const [title, setTitle] = useState('');

  const handleConfirm = async () => {
    await postWorkpiece({
      title,
    });
    props.setIsAdding(false);
    props.resetData();
  };

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="addWorkpiece">
        <div className="topBar">Top bar</div>
        <div className="content">
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <button onClick={handleConfirm}>Confirmer</button>
        </div>
        <div className="downBar">Down Bar</div>
      </div>
    </div>
  );
};

export default AddWorkpiece;
