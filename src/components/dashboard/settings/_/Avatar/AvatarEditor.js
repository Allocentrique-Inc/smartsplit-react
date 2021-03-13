import { useState } from 'react';
import Avatar from '../../../_/avatar/avatar';
import Pen from '../../../../../icons/pen';
import PictureEditModal from '../../../_/pictureEditModal/PictureEditModal';
import patchUser from '../../../../../api/users/patchUser';

const AvatarEditor = (props) => {
  const { user, setUser } = props;
  const [file, setFile] = useState();
  const [editing, setEditing] = useState();
  const handleEditClick = () => {
    setEditing(true);
  };
  const modalProps = {
    ...props,
    shape: 'circle',
    onClose: () => { setEditing(false); },
    onSave: async (imgData) => {
      const updatedUser = { ...user, avatar: imgData.split(',', 2)[1] };
      const userResponse = await patchUser(updatedUser);
      console.log(userResponse);
      setUser({ ...userResponse, avatar: imgData });
    },
  };
  return (
    <div className="avatar-editor">
      {editing && <PictureEditModal {...modalProps} />}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Avatar className="medium" user={user} /><button className="btn-icon" onClick={handleEditClick}><Pen /></button>
    </div>
  );
};
export default AvatarEditor;
