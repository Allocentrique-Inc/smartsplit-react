import config from '../../config';

const getUsersCollaborators = async (payload) => {
  const { search_terms } = payload;
  try {
    const url = `${config.apiUrl}/users/${payload.user_id}/collaborators/${
      search_terms ? `?search_terms=${search_terms}` : ''
    }`;
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
    console.log(url, parsedResponse);
    if (parsedResponse.statusCode === 404) {
      return [];
    }
    return parsedResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default getUsersCollaborators;
