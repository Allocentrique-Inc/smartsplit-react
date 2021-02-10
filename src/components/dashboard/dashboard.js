import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Workpieces from './workpieces/workpieces';
import Orientation from './orientation/orientation';
import RightSplit from './rightSplit/rightSplit';

const Dashboard = (props) => {
  const [selectedWorkpiece, selectWorkpiece] = useState('');
  const [activity, setActivity] = useState('');
  const commonProps = {
    selectedWorkpiece,
    selectWorkpiece,
    activity,
    setActivity,
  };
  return (
    <Switch>
      <Route path="/workpiece/:workpiece_id/right-split">
        <RightSplit {...props} {...commonProps} />
      </Route>
      <Route path="/workpiece/:workpiece_id">
        <Orientation {...props} {...commonProps} />
      </Route>
      <Route path="/">
        <Workpieces {...props} {...commonProps} />
      </Route>
    </Switch>
  );
};

export default Dashboard;
