import { useState } from 'react';
import CoverImage from './coverImage';
import Pen from '../../../../../icons/pen';
import PictureEditModal from '../../../_/pictureEditModal/PictureEditModal';

const EditCoverImage = (props) => {
  const [editing, setEditing] = useState();
  const handleEdit = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };
  const handleSave = (imgData) => {

  };

  return (
    <>
      {editing &&
        <PictureEditModal onClose={handleClose} onSave={handleSave} shape="square" hiRes />
      }
      <div className="edit-cover-image">
        <CoverImage {...props} className="medium" />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="btn-icon" onClick={handleEdit}><Pen /></button>
      </div>
    </>
  );
};
export default EditCoverImage;
