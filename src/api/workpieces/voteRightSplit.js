const voteRightSplit = async (payload) => {
  const { copyright, performance, recording, privacy, label } = payload;
  const body = JSON.stringify({
    copyright: copyright ? { vote: copyright, comment: 'in ' } : undefined,
    performance: performance
      ? { vote: performance, comment: 'in ' }
      : undefined,
    recording: recording ? { vote: recording, comment: 'in ' } : undefined,
    privacy: privacy ? { vote: privacy, comment: 'in ' } : undefined,
    label: label ? { vote: label, comment: 'in ' } : undefined,
  });
  console.log(body);
  try {
    const url = `http://localhost:3001/v1/workpieces/${payload.workpiece_id}/rightSplit/vote`;
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

export default voteRightSplit;
