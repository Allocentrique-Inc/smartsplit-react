import config from '../../config';

const patchWorkpiece = async (payload) => {
  const { title } = payload;
  const body = JSON.stringify({ title });
  try {
    const url = `${config.apiUrl}/workpieces/${payload.workpiece_id}`;
    const method = 'PATCH';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      body,
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

export default patchWorkpiece;
