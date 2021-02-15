import { useState, useEffect } from 'react';
import { useParams, Route } from 'react-router-dom';
import TopBar from './topBar/topBar';

const Document = (props) => {
  console.log(props);
  return (
    <div className="documentation">
      <TopBar {...props} />
      <div className="documentationContent">
        {/* <Route path="/workpiece/:workpiece_id/documentation/creation">
          <div>Creation</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/performance">
          <div>performance</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/recording">
          <div>recording</div>
        </Route> */}
        <Route path="/workpiece/:workpiece_id/documentation/release">
          <div>release</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/file">
          <div>file</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/info">
          <div>info</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/lyrics">
          <div>lyrics</div>
        </Route>
        <Route path="/workpiece/:workpiece_id/documentation/streaming">
          <div>streaming</div>
        </Route>
      </div>
      <Route path="/workpiece/:workpiece_id/documentation/" exact>
        <div>summary</div>
      </Route>
    </div>
  );
};

export default Document;
