import { useState } from 'react';
import { Link, useParams, Switch, Route } from 'react-router-dom';
import login from '../../api/auth/login';
import SmartSplit from '../../icons/smartsplit';
import Login from './login/login';
import Signup from './signup/signup';
import translations from '../../translations';

const Auth = (props) => {
  const { type } = useParams();
  const [language, setLanguage] = useState('fr');
  const commonProps = {
    ...props,
    translations: translations.auth,
    language,
  };
  const url = type === 'login' ? '/auth/signup' : '/auth/login';
  return (
    <div className="authLayout">
      <div className="topBar">
        <SmartSplit />
        <div className="right">
          <span>{translations.auth.topBar[type]._span[language]}</span>
          <Link to={url}>{translations.auth.topBar[type]._link[language]}</Link>
          <button className="btn-secondary">
            {translations.auth.topBar._languageBtn[language]}
          </button>
        </div>
      </div>
      <main>
        <Switch>
          <Route path="/auth/login">
            <Login {...commonProps} />
          </Route>
          <Route path="/auth/signup">
            <Signup {...commonProps} />
          </Route>
        </Switch>
      </main>
    </div>
  );
};

export default Auth;
