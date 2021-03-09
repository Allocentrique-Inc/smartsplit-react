import config from '../../config';

const requestPasswordReset = async (payload) => {
  const { email } = payload;
  const body = JSON.stringify({
    email,
  });
  try {
    const url = `${config.apiUrl}/users/request-password-reset`;
    const method = 'POST';
    const response = await fetch(url, {
      method,
      body,
      headers: {
        'content-type': 'application/json',
      },
    });
    const textResponse = await response.text();
    console.log(response);
    const parsedResponse = JSON.parse(textResponse);
    console.log(parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default requestPasswordReset;
