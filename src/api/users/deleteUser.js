const deleteUser = async (payload) => {
  try {
    const url = `http://localhost:3001/v1/users/${payload.user_id}`;
    const method = 'DELETE';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;

    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: bearer,
      },
    });
    localStorage.clear();
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

export default deleteUser;
