import config from '../../config';

const deleteWorkpiece = async (payload) => {
  try {
    const url = `${config.apiUrl}/workpieces/${payload.workpiece_id}`;
    const method = 'DELETE';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: bearer,
      },
    });
    const textResponse = await response.text();
    console.log(textResponse);
    return textResponse;
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default deleteWorkpiece;
