const refresh = async (payload) => {
  try {
    console.log('TRYING TO REFRESH TOKEN');
    const url = 'http://159.203.15.16:3001/v1/auth/refresh';
    const method = 'GET';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      headers: { 'content-type': 'application/json', Authorization: bearer },
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    localStorage.setItem('accessToken', parsedResponse.accessToken);
    localStorage.setItem('user_id', parsedResponse.user.user_id);
    setTimeout(() => {
      refresh();
    }, 3500000);
    console.log(parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default refresh;
