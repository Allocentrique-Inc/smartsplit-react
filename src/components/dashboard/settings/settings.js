import { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './profile/profile';
import Account from './account/account';
import ProfessionalIdentity from './professionalIdentity/professionalIdentity';
import Notifications from './notifications/notifications';
import Security from './security/security';
import ArrowLeft from '../../../icons/arrowLeft';
import ProfilePlaceholder from '../../../icons/profilePlaceholder';

export default function Settings(props) {
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
    mobilePhone: '',
    emails: [],
  });
  const [professionalIdentity, setProfessionalIdentity] = useState({
    organisations: [],
    professionalIdentity: {
      ids: [
        {
          name: 'cillum eu',
          value: 'adipisici',
        },
      ],
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

  const setters = {
    profile: setProfile,
    account: setAccount,
    professionalIdentity: setProfessionalIdentity,
    notifications: setNotifications,
  };
  const setField = (type, field) => {
    setters[type]((prevState) => ({ ...prevState, ...field }));
  };

  const commonProps = {
    profile,
    account,
    professionalIdentity,
    notifications,
    setField,
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
        <div className="colLeft toDo">NAVIGATION</div>
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
