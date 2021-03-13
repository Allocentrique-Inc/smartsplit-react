import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ChevronDown from '../../../../icons/chevronDown';
import disconnect from '../../../../api/auth/disconnect';
import Avatar from '../avatar/avatar';

const ProfileOptions = (props) => {
  const { translations, language, user } = props;
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const history = useHistory();
  const handleDisconnectBtn = () => {
    disconnect();
    props.resetLogginCheck();
  };
  const handleSettingsBtn = () => {
    history.push('/settings');
  };
  const t_language = props.translations.general._languageBtn[props.language];

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
  const handleCloseProfileOptions = async () => {
    setTimeout(() => {
      setShowProfileOptions(false);
    }, 200);
  };

  const handleToggleLanguage = () => {
    setShowProfileOptions(false);
    props.toggleLanguage();
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
          <div className="menuItem" onClick={handleToggleLanguage}>
            {t_language}
          </div>
          <div className="menuItem" onClick={handleSettingsBtn}>
            {t_settings}
          </div>
          <div className="menuItem" onClick={handleDisconnectBtn}>
            {t_disconnect}
          </div>
        </div>
      )}
      <div onClick={handleSetShowProfileOptions} className="profileOptions">
        <Avatar className="tiny" user={user} />
        <div className="chevronDown">
          <ChevronDown style={showProfileOptions ? { transform: 'rotate(180deg)' } : { transform: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
