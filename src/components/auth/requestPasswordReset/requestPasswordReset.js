import { useState } from 'react';
import requestPasswordReset from '../../../api/users/requestPasswordReset';

export default () => {
  const [email, setEmail] = useState('');
  return (
    <>
      <div>ResetPassword</div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => requestPasswordReset({ email })}>Confirmer</button>
    </>
  );
};
