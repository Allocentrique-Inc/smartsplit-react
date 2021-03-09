import config from '../../../config';

const patchDocumentation = async (payload) => {
  const { creation, workpiece_id } = payload;
  const body = JSON.stringify({ creation });
  try {
    const url = `${config.apiUrl}/workpieces/${payload.workpiece_id}/documentation`;
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

export default patchDocumentation;
