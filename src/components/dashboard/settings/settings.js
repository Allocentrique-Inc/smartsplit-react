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
import useForm from '../../_/form/useForm';

export default function Settings(props) {
  const { user } = props;
  const form = useForm({
    avatar: {
      value: '',
      errors: [],
    },
    firstName: { value: '', errors: [] },
    lastName: { value: '', errors: [] },
    artistName: { value: '', errors: [] },
    projects: { value: [], errors: [] },
    address: { value: '', errors: [] },
    locale: { value: '', errors: [] },
    phoneNumber: { value: '', errors: [] },
    emails: { value: [], errors: [] },
    organisations: { value: [], errors: [] },
    professionalIdentity: {
      value: {
        ids: [],
        public: false,
      },
      errors: [],
    },
    birthDate: { value: '', errors: [] },
    isni: { value: '', errors: [] },
    uri: { value: '', errors: [] },
    notifications: {
      value: {
        generalInteractions: ['email'],
        administrativeMessages: ['email'],
        accountLogin: [],
        smartsplitBlog: [],
        smartsplitPromotions: [],
        partnerPromotions: [],
      },
      errors: [],
    },
  });

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
    generalInteractions: ['email'],
    administrativeMessages: ['email'],
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
    const user_id = user.user_id;
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
      props.refreshUser();
    }
  };

  const mapData = async () => {
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
  };
  useEffect(() => {
    mapData();
  }, []);

  const commonProps = {
    ...props,
    form,
    updateUser: () => {},
  };
  return (
    <div className="settings">
      <div className="topBar">
        <Link to="/">
          <ArrowLeft />
        </Link>
        <ProfilePlaceholder />
      </div>
      <main className="row">
        {/*<div className="colLeft">
          <div className="navigation">
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
          </div>
        </div>*/}
        <div className="colRight">
          <Profile {...commonProps} />
          {/*<Account {...commonProps} />*/}
          {/*<ProfessionalIdentity {...commonProps} />*/}
          {/*<Notifications {...commonProps} className="toDo" />*/}
          {/*<Security {...commonProps} />*/}
        </div>
      </main>
    </div>
  );
}
