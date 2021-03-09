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
import regularFont from './components/dashboard/testing/Roboto/Roboto-Regular.ttf';
import italicFont from './components/dashboard/testing/Roboto/Roboto-Italic.ttf';
import boldFont from './components/dashboard/testing/Roboto/Roboto-Bold.ttf';
import boldItalicFont from './components/dashboard/testing/Roboto/Roboto-BoldItalic.ttf';

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
