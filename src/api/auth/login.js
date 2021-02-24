const login = async (payload) => {
  const { email, password } = payload;
  const body = JSON.stringify({ email, password });
  try {
    console.log('TRYING TO LOG');
    const url = 'http://159.203.15.16:3001/v1/auth/login';
    const method = 'POST';
    const response = await fetch(url, {
      method,
      body,
      headers: { 'content-type': 'application/json' },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    localStorage.setItem('accessToken', parsedResponse.accessToken);
    localStorage.setItem('user_id', parsedResponse.user.user_id);
    console.log(parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default login;
