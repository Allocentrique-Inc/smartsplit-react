import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { NavHashLink } from 'react-router-hash-link';
import Profile from './profile/profile';
import Account from './account/account';
import ProfessionalIdentity from './professionalIdentity/professionalIdentity';
import Notifications from './notifications/notifications';
import Security from './security/security';
import ArrowLeft from '../../../icons/arrowLeft';
import ProfilePlaceholder from '../../../icons/profilePlaceholder';
import patchUser from '../../../api/users/patchUser';
import getUsers from '../../../api/users/getUsers';
import { loadObjToAnother } from '../../../utils';

export default function Settings(props) {
  const [user_id] = useState(localStorage.getItem('user_id'));
  const [profile, setProfile] = useState({
    avatar: '',
    firstName: '',
    lastName: '',
    artistName: '',
    projects: [],
  });
  const [account, setAccount] = useState({
    address: '',
    locale: '',
    phoneNumber: '',
    emails: [],
  });
  const [professionalIdentity, setProfessionalIdentity] = useState({
    organisations: [],
    professionalIdentity: {
      ids: [],
      public: false,
    },
    birthDate: '',
    isni: '',
    uri: '',
  });
  const [notifications, setNotifications] = useState({
    generalInteractions: ['email', 'push'],
    administrativeMessages: ['email', 'push'],
    accountLogin: [],
    smartsplitBlog: [],
    smartsplitPromotions: [],
    partnerPromotions: [],
  });

  const [dirtyFields, setDirtyFields] = useState([]);

  const setters = {
    profile: setProfile,
    account: setAccount,
    professionalIdentity: setProfessionalIdentity,
    notifications: setNotifications,
  };
  const setField = (type, field) => {
    setters[type]((prevState) => ({ ...prevState, ...field }));
    if (type === 'notifications' && !dirtyFields.includes('notifications')) {
      dirtyFields.push('notifications');
    } else if (type !== 'notifications') {
      dirtyFields.push(Object.keys(field)[0]);
    }
    setDirtyFields([...dirtyFields]);
  };

  const updateUser = async () => {
    const fields = {
      ...profile,
      ...account,
      ...professionalIdentity,
      notifications,
    };
    Object.keys(fields).forEach(
      (key) => !dirtyFields.includes(key) && delete fields[key],
    );
    if (Object.entries(fields).length > 0) {
      await patchUser({ user_id, ...fields });
      setDirtyFields([]);
    }
  };

  const mapData = async () => {
    const user = await getUsers({ user_id });
    console.log('DATA TO LOAD', user);
    loadObjToAnother(user, profile);
    setProfile({ ...profile });
    loadObjToAnother(user, account);
    if (user.mobilePhone) {
      account.phoneNumber = user.mobilePhone.number;
    }
    setAccount({ ...account });
    loadObjToAnother(user, professionalIdentity);
    setProfessionalIdentity({ ...professionalIdentity });
    setNotifications(user.notifications);
    Object.keys(account).forEach((key) => {
      if (user[key]) {
        account[key] = user[key];
      }
    });
  };
  useEffect(() => {
    mapData();
  }, []);

  const commonProps = {
    profile,
    account,
    professionalIdentity,
    notifications,
    setField,
    updateUser,
  };
  return (
    <div className="settings">
      <div className="topBar">
        <Link to="/">
          {' '}
          <ArrowLeft />
          {' '}
        </Link>
        <ProfilePlaceholder />
      </div>
      <main className="row">
        <div className="colLeft">
          {/* <div className="navigation">
            <NavHashLink
              smooth
              activeClassName="selected"
              to="/settings#profile"
            >
              Profil
            </NavHashLink>
            <NavHashLink
              smooth
              activeClassName="selected"
              to="/settings#account"
            >
              Compte
            </NavHashLink>
            <NavHashLink
              smooth
              activeClassName="selected"
              to="/settings#professional-identity"
            >
              Identité professionnelle
            </NavHashLink>
            <NavHashLink
              smooth
              activeClassName="selected"
              to="/settings#notifications"
            >
              Notifications
            </NavHashLink>
            <NavHashLink
              smooth
              activeClassName="selected"
              to="/settings#security"
            >
              Sécurité
            </NavHashLink>
          </div> */}
        </div>
        <div className="colRight">
          <Profile {...commonProps} />
          <Account {...commonProps} />
          <ProfessionalIdentity {...commonProps} />
          <Notifications {...commonProps} />
          <Security {...commonProps} />
        </div>
      </main>
    </div>
  );
}
