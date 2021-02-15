const postRightSplit = async (payload) => {
  const {
    copyright,
    performance,
    recording,
    copyrightDividingMethod,
    privacy,
    label,
  } = payload;
  let arr = [...copyright, ...performance, ...recording];
  if (label.rightHolder) {
    arr = [...arr, label];
  }

  arr.forEach((el) => {
    // eslint-disable-next-line no-param-reassign
    el.rightHolder = typeof el.rightHolder === 'string'
      ? el.rightHolder
      : el.rightHolder.user_id;
  });

  const body = JSON.stringify({
    copyright,
    performance,
    recording,
    privacy,
    copyrightDividingMethod,
    label: label.rightHolder ? label : undefined,
  });
  try {
    const url = `http://localhost:3001/v1/workpieces/${payload.workpiece_id}/rightSplit`;
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

export default postRightSplit;
