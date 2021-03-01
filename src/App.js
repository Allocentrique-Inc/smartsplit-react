import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Admin from './components/admin/admin';
import Dashboard from './components/dashboard/dashboard';
import Public from './components/public/public';
import check from './api/auth/check';
import './styles/index.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path={['/user', '/login', '/signup']}>
          <Public />
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
    const isLogged = checkResult.statusCode !== 401;
    setIsLogged(isLogged);
    setIsLoaded(true);
  };
  useEffect(() => {
    resetLogginCheck();
  });
  return (
    <>
      {!isLoaded && 'LOADING'}
      {isLoaded && isLogged && (
        <Dashboard {...props} resetLogginCheck={resetLogginCheck} />
      )}
      {isLoaded && !isLogged && <Redirect to="/login" />}
    </>
  );
};

export default App;
