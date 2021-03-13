import { useState } from 'react';
import PropTypes from 'prop-types';
import CoverImage from './coverImage';
import Pen from '../../../../icons/pen';
import PictureEditModal from '../pictureEditModal/PictureEditModal';
import PlusCircle from '../../../../icons/plusCircleFull';
/**
 * A Form element for creating and saving an image for a workpiece
 *
 * because unlike the avatar the creation is more complicated because
 * a workpiece may not yet exist, we simply the complexity by simply
 * requiring an onSave handler, which would be more appropriate for
 * a workpiece creation form
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const EditCoverImage = (props) => {
  const [editing, setEditing, onSave, mode, workpiece] = useState();
  const handleEdit = () => {
    setEditing(true);
  };
  const handleClose = () => {
    setEditing(false);
  };
  const handleSave = (imgData) => {
    onSave(imgData);
  };

  return (
    <>
      {editing &&
        <PictureEditModal onClose={handleClose} onSave={handleSave} shape="square" hiRes />
      }
      <div className="edit-cover-image">
        <CoverImage {...props} className="medium" />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="btn-icon" onClick={handleEdit}>{
          mode === 'create'
            ? <PlusCircle />
            : <Pen />}
        </button>
      </div>
    </>
  );
};
EditCoverImage.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
  onSave: PropTypes.func.isRequired,
};
EditCoverImage.defaultProps = {
  mode: 'edit',
};
export default EditCoverImage;
