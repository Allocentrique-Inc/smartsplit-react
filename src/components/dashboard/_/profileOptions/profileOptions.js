import { useState } from 'react';
import ChevronDown from '../../../../icons/chevronDown';
import disconnect from '../../../../api/auth/disconnect';

const ProfileOptions = (props) => {
  console.log(props.user);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  let t_initials;
  if (props.user && props.user.firstName && props.user.lastName) {
    const { firstName, lastName } = props.user;
    t_initials = firstName[0] + lastName[0];
  }
  const handleDisconnect = () => {
    disconnect();
    props.resetLogginCheck();
  };
  return (
    <div
      onClick={() => {
        setShowProfileOptions((e) => !e);
      }}
      className="profileOptions"
    >
      <div className="avatar">{t_initials}</div>
      <div className="chevronDown">
        <ChevronDown />
        {showProfileOptions && (
          <button className="profileMenuOption" onClick={handleDisconnect}>
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileOptions;
