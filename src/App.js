import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Admin from './components/admin/admin';
import Dashboard from './components/dashboard/dashboard';
import check from './api/auth/check';
import './styles/index.scss';

import Auth from './components/auth/auth';
import ActivateEmail from './components/user/activateEmail/activateEmail';
import ChangePassword from './components/user/changePassword/changePassword';
import RequestPasswordReset from './components/user/requestPasswordReset/requestPasswordReset';
import Login from './components/auth/login/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/auth/:type">
          <Auth />
        </Route>
        <Route path="/user/activate/:token">
          <ActivateEmail />
        </Route>
        <Route path="/user/change-password/:token">
          <ChangePassword />
        </Route>
        <Route path="/auth/request-password-reset">
          <RequestPasswordReset />
        </Route>
        <Route path="/" exact>
          <LoadingManager />
        </Route>
      </Switch>
    </Router>
  );
}

const LoadingManager = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const resetLogginCheck = async () => {
    const checkResult = await check();
    const isLogged = checkResult.statusCode !== 401;
    setIsLoaded(true);
    setIsLogged(isLogged);
  };
  useEffect(() => {
    resetLogginCheck();
  });
  return (
    <>
      {!isLoaded && 'LOADING'}
      {isLoaded && isLogged && (
        <Dashboard resetLogginCheck={resetLogginCheck} />
      )}
      {isLoaded && !isLogged && <Auth resetLogginCheck={resetLogginCheck} />}
    </>
  );
};

export default App;
