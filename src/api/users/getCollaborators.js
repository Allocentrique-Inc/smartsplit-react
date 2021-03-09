import config from '../../../config';

const getUsersCollaborators = async (payload) => {
  try {
    const url = `${config.apiUrl}/users/${payload.user_id}/collaborators/?search_terms=&degree=5&limit=50&skip=0`;
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

export default getUsersCollaborators;
