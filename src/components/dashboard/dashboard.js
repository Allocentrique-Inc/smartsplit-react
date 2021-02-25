import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Workpieces from './workpieces/workpieces';
import Workpiece from './workpiece/workpiece';
import Settings from './settings/settings';
import getUsers from '../../api/users/getUsers';

const Dashboard = (props) => {
  const [selectedWorkpiece, selectWorkpiece] = useState('');
  const [activity, setActivity] = useState('');
  const [user, setUser] = useState(null);
  const user_id = localStorage.getItem('user_id');
  const [language, setLanguage] = useState('');
  useEffect(() => {
    user && setLanguage(user.locale);
  }, [user]);
  useEffect(() => {
    const getUser = async () => {
      const user = await getUsers({ user_id });
      setUser(user);
    };
    getUser();
  }, []);
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
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
  };
  return (
    <Switch>
      <Route path="/workpiece/:workpiece_id">
        <Workpiece {...props} {...commonProps} />
      </Route>
      <Route path="/settings">
        <Settings {...props} {...commonProps} />
      </Route>
      <Route path="/">
        <Workpieces {...props} {...commonProps} />
      </Route>
    </Switch>
  );
};

export default Dashboard;
