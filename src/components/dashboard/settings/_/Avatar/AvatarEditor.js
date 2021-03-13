import { useState } from 'react';
import Avatar from '../../../_/avatar/avatar';
import Pen from '../../../../../icons/pen';
import AvatarEditModal from './AvatarEditModal';

const AvatarEditor = (props) => {
  const { user, setUser } = props;
  const [file, setFile] = useState();
  const [editing, setEditing] = useState();
  const handleEditClick = () => {
    setEditing(true);
  };
  const modalProps = {
    ...props,
    setEditing,
  };
  return (
    <div className="avatar-editor">
      {editing && <AvatarEditModal {...modalProps} />}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <Avatar className="medium" user={user} /><button className="btn-icon" onClick={handleEditClick}><Pen /></button>
    </div>
  );
};
export default AvatarEditor;
