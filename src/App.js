import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Font } from '@react-pdf/renderer';
import Dashboard from './components/dashboard/dashboard';
import Public from './components/public/public';
import check from './api/auth/check';
import './styles/index.scss';
import Loading from './components/_/loading/loading';

function App() {
  return (
    <Router>
      <Switch>
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
  const [isLogChecked, setIsLogChecked] = useState(false);
  const resetLogginCheck = async () => {
    const checkResult = await check();
    const isLogged = checkResult.statusCode !== 401;
    setIsLogged(isLogged);
    setIsLogChecked(true);
  };
  useEffect(() => {
    resetLogginCheck();
  });
  const commonProps = {
    ...props,
    setIsLoaded,
    isLoaded,
  };
  return (
    <>
      {(!isLoaded || !isLogged) && <Loading />}
      {isLogChecked && isLogged && (
        <Dashboard {...commonProps} resetLogginCheck={resetLogginCheck} />
      )}
      {isLogChecked && !isLogged && <Redirect to="/login" />}
    </>
  );
};

export default App;
