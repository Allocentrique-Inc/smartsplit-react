import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Workpieces from './workpieces/workpieces';
import Workpiece from './workpiece/workpiece';
import Settings from './settings/settings';
import getUsers from '../../api/users/getUsers';
import translations from '../../translations';
import patchUser from '../../api/users/patchUser';
import Logistic from './logistic/logistic';
import getWorkpiecesByOwner from '../../api/workpieces/getWorkpiecesByOwner';
import getWorkpiecesByRightHolder from '../../api/workpieces/getWorkpiecesByRightHolder';

const Dashboard = (props) => {
  const user_id = localStorage.getItem('user_id');
  const [workpiecesByOwner, setWorkpiecesByOwner] = useState([]);
  const [workpiecesByRightHolder, setWorkpiecesByRightHolder] = useState([]);
  const [selectedWorkpiece, selectWorkpiece] = useState('');
  const [activity, setActivity] = useState('');
  const [user, setUser] = useState(null);
  const [loadingProcessRemaining, setLoadingProcessRemaining] = useState(0);
  const [apiErrors, setApiErrors] = useState([]);
  const [tab, setTab] = useState('owner'); // workpieces page tabs

  const setConvenientTab = () => {
    if (
      workpiecesByOwner.length === 0 &&
      workpiecesByRightHolder.length !== 0 &&
      loadingProcessRemaining === 0
    ) {
      setTab('rightHolder');
    }
  };

  const resetWorkpiecesByOwner = async () => {
    const workpiecesByOwner = await getWorkpiecesByOwner({ user_id });
    setWorkpiecesByOwner(workpiecesByOwner);
    setLoadingProcessRemaining((s) => s - 1);
  };

  const resetWorkpiecesByRightHolder = async () => {
    const workpiecesByRightHolder = await getWorkpiecesByRightHolder({
      user_id,
    });
    setWorkpiecesByRightHolder(workpiecesByRightHolder);
    setLoadingProcessRemaining((s) => s - 1);
  };

  const resetData = async () => {
    setLoadingProcessRemaining((s) => s + 2);
    resetWorkpiecesByOwner();
    resetWorkpiecesByRightHolder();
  };

  const refreshUser = async () => {
    setLoadingProcessRemaining((s) => s + 1);
    const user = await getUsers({ user_id });
    setUser(user);
    setLoadingProcessRemaining((s) => s - 1);
  };

  useEffect(() => {
    props.setIsLoaded(false);
    refreshUser();
    resetData();
  }, []);

  useEffect(() => {
    if (loadingProcessRemaining === 0) {
      props.setIsLoaded(true);
    } else {
      props.setIsLoaded(false);
    }
    setConvenientTab();
  }, [loadingProcessRemaining]);

  const language = (user && user.locale) || 'fr';
  const toggleLanguage = async () => {
    const newLanguage = language === 'fr' ? 'en' : 'fr';
    await patchUser({ locale: newLanguage, user_id });
    await refreshUser();
  };

  // if (!user) return null;

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
    resetData,
    tab,
    setTab,
    resetWorkpiecesByOwner,
    workpiecesByOwner,
    workpiecesByRightHolder,
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
