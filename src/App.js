import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './components/admin/admin';
import Dashboard from './components/dashboard/dashboard';
import check from './api/auth/check';
import './styles/index.scss';
import Login from './components/logIn/logIn';
import ActivateEmail from './components/auth/activateEmail/activateEmail';
import ChangePassword from './components/auth/changePassword/changePassword';
import RequestPasswordReset from './components/auth/requestPasswordReset/requestPasswordReset';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
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
        <Route path="/">
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
    const isLogged = checkResult === true;
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
      {isLoaded && !isLogged && <Login resetLogginCheck={resetLogginCheck} />}
    </>
  );
};

export default App;
