const createAddress = async (user, address) => {
  try {
    const url = `http://localhost:3001/v1/user/${user.user_id}/addresses/`;
    const method = 'POST';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(address),
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

export default createAddress;
