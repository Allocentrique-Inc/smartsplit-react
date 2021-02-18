const changePassword = async (payload) => {
  const { password, token, currentPassword } = payload;
  const body = JSON.stringify({
    password,
    token,
    currentPassword,
  });
  try {
    const url = 'http://localhost:3001/v1/users/change-password';
    const method = 'POST';
    const headers = {
      'content-type': 'application/json',
    };
    if (currentPassword) {
      headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    localStorage.setItem('accessToken', parsedResponse.accessToken);
    console.log(parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default changePassword;
