import { useState } from 'react';
import Profile from './profile/profile';
import Account from './account/account';
import ProfessionalIdentity from './professionalIdentity/professionalIdentity';

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
      birthDate: '',
      isni: '',
      uri: '',
    },
  });
  const [notifications, setNotifications] = useState({
    generalInteractions: [],
    administrativeMessages: [],
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
    setters[type]((prevState) => {
      console.log('prevstate', prevState);
      return { ...prevState, ...field };
    });
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
      <Profile {...commonProps} />
      <Account {...commonProps} />
      <ProfessionalIdentity {...commonProps} />
    </div>
  );
}
