import config from '../../config';

const submitRightSplit = async (payload) => {
  const { emails } = payload;
  const body = JSON.stringify(emails);
  try {
    const url = `${config.apiUrl}/workpieces/${payload.workpiece_id}/rightSplit/submit`;
    const method = 'POST';
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

export default submitRightSplit;
