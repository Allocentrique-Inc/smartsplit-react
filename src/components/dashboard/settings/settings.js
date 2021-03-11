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
  const form = useForm(
    {
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
    },
    true,
  );

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
  const updateUser = async () => {
    if (form.isValid()) {
      await patchUser({ user_id: user.user_id, ...form.toJS() });
      props.refreshUser();
    }
  };

  useEffect(() => {
    form.loadFields({
      ...user,
      phoneNumber: user.mobilePhone.number,
    });
  }, []);

  const commonProps = {
    ...props,
    form,
    updateUser,
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
