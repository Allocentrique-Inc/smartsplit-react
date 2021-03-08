const getUsers = async (payload) => {
  try {
    const url = `http://159.203.15.16:3001/v1/users/${payload.user_id}`;
    const method = 'GET';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: bearer,
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

export default getUsers;
