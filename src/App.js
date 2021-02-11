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
import User from './components/user/user';

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
        <Route path="/user">
          <User />
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
