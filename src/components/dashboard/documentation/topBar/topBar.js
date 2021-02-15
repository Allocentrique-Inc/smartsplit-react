import { Route } from 'react-router-dom';

const TopBar = (props) => (
  <div className="topBar">
    <div>TITLE</div>
    <div>
      BreadCrumb /
      <Route path="/workpiece/:workpiece_id/documentation/creation">
        <span>Creation</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/performance">
        <span>performance</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/recording">
        <span>recording</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/release">
        <span>release</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/file">
        <span>file</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/info">
        <span>info</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/lyrics">
        <span>lyrics</span>
      </Route>
      <Route path="/workpiece/:workpiece_id/documentation/streaming">
        <span>streaming</span>
      </Route>
    </div>
    <div>Credit</div>
    <div>Save and Close</div>
    <div>Profile</div>
  </div>
);

export default TopBar;
