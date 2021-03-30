import { useHistory } from 'react-router-dom';
import Avatar from '../../_/avatar/avatar';
import Pen from '../../../../icons/pen';
import User from '../../../../icons/user';
import UserCard from '../../../../icons/userCard';
import Cog from '../../../../icons/cog';
import Logout from '../../../../icons/logout';

export default function MobileMenu({ user, translations, language }) {
  const history = useHistory();
  const t_public_profile =
    translations.settings.mobileMenu['_public-profile'][language];
  const t_account = translations.settings.mobileMenu._account[language];
  const t_preferences = translations.settings.mobileMenu._preferences[language];
  const t_logout = translations.settings.mobileMenu._logout[language];
  return (
    <>
      <div className="topBar">
        <div className="mobileHeader">
          <div>
            <Avatar id="avatar" className="small" user={user} />
            <h1>ArtistName</h1>
            <p className="medium-400">firstName lastName</p>
          </div>
          <button className="btn-icon" onClick={() => {}}>
            <Pen />
          </button>
        </div>
      </div>
      <main>
        <div
          className="menuOption"
          onClick={() => history.push('/settings/public-profile')}
        >
          <User />
          {t_public_profile}
        </div>
        <div
          className="menuOption"
          onClick={() => history.push('/settings/account')}
        >
          <UserCard />
          {t_account}
        </div>
        <div
          className="menuOption"
          onClick={() => history.push('/settings/preferences')}
        >
          <Cog />
          {t_preferences}
        </div>
        <div className="menuOption">
          <Logout />
          {t_logout}
        </div>
      </main>
    </>
  );
}
