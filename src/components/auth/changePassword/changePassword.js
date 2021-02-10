import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import changePassword from '../../../api/users/changePassword';

export default () => {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState('');

  return (
    <>
      <div>ChangePassword</div>
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => changePassword({ token, password })}>
        Confirmer
      </button>
    </>
  );
};
