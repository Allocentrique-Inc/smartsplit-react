const changePassword = async (payload) => {
  const { password, token, currentPassword } = payload;
  const body = JSON.stringify({
    password,
    token,
    currentPassword,
  });
  try {
    const url = 'http://159.203.15.16:3001/v1/users/change-password';
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
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default changePassword;
