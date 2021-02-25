import { useState } from 'react';
import {
  Link,
  useParams,
  useRouteMatch,
  Switch,
  Route,
} from 'react-router-dom';
import login from '../../api/auth/login';
import SmartSplit from '../../icons/smartsplit';
import ActivateEmail from './activateEmail/activateEmail';
import ChangePassword from './changePassword/changePassword';
import RequestPasswordReset from './requestPasswordReset/requestPasswordReset';
import PasswordResetConfirmation from './passwordResetConfirmation/passwordResetConfirmation';
import ActivateInvitedUser from './activateInvitedUser/activateInvitedUser';
import Onboarding from './onboarding/onboarding';

const User = (props) => {
  const commonProps = { ...props };
  return (
    <div className="authLayout">
      <div className="topBar">
        <SmartSplit />
        <div className="right">
          <span>Pas encore membre ?</span>
          <Link to="/auth/signup">Créer mon compte</Link>
          <button className="btn-secondary">English</button>
        </div>
      </div>
      <main>
        <Switch>
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
};

export default User;
