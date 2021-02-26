import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronDown from '../../../../icons/chevronDown';
import disconnect from '../../../../api/auth/disconnect';

const ProfileOptions = (props) => {
  const { translations, language } = props;
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const history = useHistory();
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
    <>
      {showProfileOptions && (
        <div
          className="profileMenuBackground"
          onClick={() => setShowProfileOptions(false)}
        >
          <div className="profileMenu">
            <button
              className="menuItem"
              onClick={() => history.push('/settings')}
            >
              {translations.general.profileOptions._settings[language]}
            </button>
            <button className="menuItem" onClick={handleDisconnect}>
              {translations.general.profileOptions._logout[language]}
            </button>
          </div>
        </div>
      )}
      <div
        onClick={() => {
          setShowProfileOptions((e) => !e);
        }}
        className="profileOptions"
      >
        <div className="avatar">{t_initials}</div>
        <div className="chevronDown">
          <ChevronDown />
        </div>
      </div>
    </>
  );
};

export default ProfileOptions;
