import refresh from '../auth/refresh';

const postUser = async (payload) => {
  const { token, password, firstName, lastName, artistName } = payload;
  console.log(payload);
  const body = JSON.stringify({
    token,
    password,
    firstName,
    lastName,
    artistName,
  });
  try {
    const url = 'http://localhost:3001/v1/users/activate-invited';
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
      console.log('HERE');
      localStorage.setItem('accessToken', parsedResponse.accessToken);
      localStorage.setItem('user_id', parsedResponse.user.user_id);
    }
    setTimeout(() => {
      refresh();
    }, 100000);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default postUser;
