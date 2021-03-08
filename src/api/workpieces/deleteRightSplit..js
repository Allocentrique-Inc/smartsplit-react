const submitRightSplit = async (payload) => {
  const body = JSON.stringify({});
  try {
    const url = `http://159.203.15.16:3001/v1/workpieces/${payload.workpiece_id}/rightSplit`;
    const method = 'DELETE';
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
