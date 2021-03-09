import refresh from '../auth/refresh';
import config from '../../../config';

const activateEmail = async (payload) => {
  const { token } = payload;
  const body = JSON.stringify({
    token,
  });
  try {
    const url = `${config.apiUrl}/users/activate`;
    const method = 'POST';
    const response = await fetch(url, {
      method,
      body,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log(parsedResponse);
    if (parsedResponse.accessToken) {
      localStorage.setItem('accessToken', parsedResponse.accessToken);
      localStorage.setItem('user_id', parsedResponse.user.user_id);
    }
    setTimeout(() => {
      refresh();
    }, 3500000);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default activateEmail;
