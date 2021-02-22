import { useState } from 'react';
import ChevronDown from '../../../../icons/chevronDown';
import disconnect from '../../../../api/auth/disconnect';

const ProfileOptions = (props) => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  // const { firstName, lastName } = props.workpiece.owner;
  const t_initials = 'AA'; // firstName[0] + lastName[0];
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
