import { useState } from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import translations from '../../translations';
import SmartSplit from '../../icons/smartsplit';
import Login from './login/login';
import Signup from './signup/signup';
import ActivateEmail from './activateEmail/activateEmail';
import ChangePassword from './changePassword/changePassword';
import RequestPasswordReset from './requestPasswordReset/requestPasswordReset';
import PasswordResetConfirmation from './passwordResetConfirmation/passwordResetConfirmation';
import ActivateInvitedUser from './activateInvitedUser/activateInvitedUser';
import Onboarding from './onboarding/onboarding';

export default function Public({ isMobile }) {
  const match = useRouteMatch();
  const isInvited = useRouteMatch('/user/activate-invited-user');
  const [language, setLanguage] = useState('fr');
  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');
  const commonProps = {
    isMobile,
    language,
    toggleLanguage,
    translations,
  };
  const topBarMode = match.path === '/login' ? 'login' : 'signup';
  const t_url = topBarMode === 'login' ? '/signup' : '/login';
  const t_span = translations.publicPages.topBar[topBarMode]._span[language];
  const t_link = translations.publicPages.topBar[topBarMode]._link[language];
  const t_language = translations.general._languageBtn[language];
  return (
    <div className="publicPages">
      {!isInvited && !isMobile && (
        <div className="topBar">
          <SmartSplit />
          <div className="right">
            <span>{t_span}</span>
            <Link to={t_url}>{t_link}</Link>
            <button className="btn-secondary" onClick={toggleLanguage}>
              {t_language}
            </button>
          </div>
        </div>
      )}
      <main>
        <Switch>
          <Route path="/login">
            <Login {...commonProps} />
          </Route>
          <Route path="/signup">
            <Signup {...commonProps} />
          </Route>
          <Route path="/user/activate/:token">
            <ActivateEmail {...commonProps} />
          </Route>
          <Route path="/user/activate-invited-user/:token/:firstName/:lastName">
            <ActivateInvitedUser {...commonProps} />
          </Route>
          <Route path="/user/change-password/:token">
            <ChangePassword {...commonProps} />
          </Route>
          <Route path="/user/request-password-reset">
            <RequestPasswordReset {...commonProps} />
          </Route>
          <Route path="/user/password-reset-confirmation">
            <PasswordResetConfirmation {...commonProps} />
          </Route>
          <Route path="/user/onboarding">
            <Onboarding {...commonProps} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
