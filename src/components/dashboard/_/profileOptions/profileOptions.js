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
  const handleDisconnectBtn = () => {
    disconnect();
    props.resetLogginCheck();
  };
  const handleSettingsBtn = () => {
    history.push('/settings');
  };
  const handleSetShowProfileOptions = () => {
    setShowProfileOptions((e) => !e);
    setTimeout(() => {
      try {
        document.getElementById('profileMenu1').focus();
      } catch (e) {
        console.log('');
      }
    }, 0);
  };
  const handleCloseProfileOptions = () => {
    setTimeout(() => {
      setShowProfileOptions(false);
    }, 200);
  };

  const t_settings = translations.general.profileOptions._settings[language];
  const t_disconnect = translations.general.profileOptions._logout[language];
  return (
    <div>
      {showProfileOptions && (
        <div
          className="profileMenu"
          tabIndex="0"
          onBlur={handleCloseProfileOptions}
          id="profileMenu1"
        >
          <div className="menuItem" onClick={handleSettingsBtn}>
            {t_settings}
          </div>
          <div className="menuItem" onClick={handleDisconnectBtn}>
            {t_disconnect}
          </div>
        </div>
      )}
      <div onClick={handleSetShowProfileOptions} className="profileOptions">
        <div className="avatar">{t_initials}</div>
        <div className="chevronDown">
          <ChevronDown />
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
