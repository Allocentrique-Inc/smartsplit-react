const submitRightSplit = async (payload) => {
  const { emails } = payload;
  console.log(payload);
  const body = JSON.stringify(emails);
  try {
    const url = `http://localhost:3001/v1/workpieces/${payload.workpiece_id}/rightSplit/submit`;
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
    console.log(textResponse);
  } catch (err) {
    console.log(err);
    const parsedResponse = { errors: ["Can't reach server"] };
    return parsedResponse;
  }
};

export default submitRightSplit;
