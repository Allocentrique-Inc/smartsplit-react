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

const User = (props) => {
  const match = useRouteMatch();
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
      <Switch>
        <Route path={`${match.path}/activate/:token`}>
          <ActivateEmail />
        </Route>
        <Route path={`${match.path}/change-password/:token`}>
          <ChangePassword />
        </Route>
        <Route path={`${match.path}/request-password-reset`}>
          <RequestPasswordReset />
        </Route>
        <Route path={`${match.path}/password-reset-confirmation`}>
          <PasswordResetConfirmation />
        </Route>
      </Switch>
    </div>
  );
};

export default User;
