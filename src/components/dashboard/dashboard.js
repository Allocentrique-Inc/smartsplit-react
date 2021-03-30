import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Workpieces from './workpieces/workpieces';
import Workpiece from './workpiece/workpiece';
import Settings from './settings/settings';
import getUsers from '../../api/users/getUsers';
import translations from '../../translations';
import patchUser from '../../api/users/patchUser';
import Logistic from './logistic/logistic';

const Dashboard = (props) => {
  const [selectedWorkpiece, selectWorkpiece] = useState('');
  const [activity, setActivity] = useState('');
  const [user, setUser] = useState(null);
  const [apiErrors, setApiErrors] = useState([]);
  const user_id = localStorage.getItem('user_id');
  const refreshUser = async () => {
    props.setIsLoaded(false);
    const user = await getUsers({ user_id });
    setUser(user);
    props.setIsLoaded(true);
  };
  useEffect(() => {
    refreshUser();
  }, []);
  const language = (user && user.locale) || 'fr';
  const toggleLanguage = async () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    await patchUser({ locale: newLanguage, user_id });
    await refreshUser();
  };
  if (!user) return null;
  const commonProps = {
    selectedWorkpiece,
    selectWorkpiece,
    activity,
    setActivity,
    user,
    setUser,
    language,
    toggleLanguage,
    translations,
    refreshUser,
  };
  return (
    <Switch>
      <Route path="/workpiece/:workpiece_id">
        <Workpiece {...props} {...commonProps} />
      </Route>
      <Route path={['/settings/:section', '/settings']}>
        <Settings {...props} {...commonProps} />
      </Route>
      <Route path="/logistic">
        <Logistic {...props} {...commonProps} />
      </Route>
      <Route path="/">
        <Workpieces {...props} {...commonProps} />
      </Route>
    </Switch>
  );
};

export default Dashboard;
