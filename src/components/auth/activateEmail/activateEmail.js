import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import activateEmail from '../../../api/users/activateEmail';

export default () => {
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    const activate = async () => {
      await activateEmail({ token });
      history.push('/');
    };
    activate();
  }, []);
  return <div>ActivateEmail</div>;
};
