const activateEmail = async (payload) => {
  const { token } = payload;
  const body = JSON.stringify({
    token,
  });
  try {
    const url = 'http://localhost:3001/v1/users/activate';
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

export default activateEmail;
