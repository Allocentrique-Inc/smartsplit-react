import { useState } from 'react';
import X from '../../../../../icons/x';
import Slider from '../../../../_/form/slider/Slider';

const AvatarEditModal = (props) => {
  const { setEditing } = props;
  const [saving, setSaving] = useState();
  const [zoom, setZoom] = useState(100);
  const handleClose = () => {
    setEditing(false);
  };
  return (
    <div className="avatarModal">
      <div className="modalBackground" onClick={handleClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="topBar">
            <h4>Edit Profile Picture</h4>
            <button
              className="btn-icon"
              disabled={saving}
              onClick={handleClose}
            >
              <X />
            </button>
          </div>
          <div className="content">
            <div style={{ width: '250px' }}>
              <Slider value={zoom} setValue={setZoom} leftLabel="100%" rightLabel="500%" range={[100, 500]} />
              zoom:{zoom}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AvatarEditModal;
