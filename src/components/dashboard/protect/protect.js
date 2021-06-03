import {
  useParams,
  Route,
  useHistory,
  useRouteMatch,
  Switch,
} from 'react-router-dom';
import TopBar from './_/topBar/topBar';
import File from './file/file';

const Protect = (props) => {
  const { language } = props;
  const { workpiece_id } = useParams();
  const history = useHistory();

  return (
    <div className="protect">
      <Switch>
        <Route path="/workpiece/:workpiece_id/protect/file">
          <File {...props} />
        </Route>
      </Switch>
    </div>
  );
};

export default Protect;
