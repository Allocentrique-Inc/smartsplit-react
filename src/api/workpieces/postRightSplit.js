const postRightSplit = async (payload) => {
  const {
    copyright,
    performance,
    recording,
    copyrightDividingMethod,
    label,
    isPublic,
  } = payload;

  let arr = [...copyright, ...performance, ...recording];
  if (label.rightHolder) {
    arr = [...arr, label];
  }

  arr.forEach((el) => {
    el.rightHolder =
      typeof el.rightHolder === 'string' ? el.rightHolder : el.rightHolder_id;
  });

  const body = JSON.stringify({
    copyright,
    performance,
    recording,
    isPublic,
    copyrightDividingMethod,
    label: label.rightHolder_id ? label : undefined,
  });
  try {
    const url = `http://159.203.15.16:3001/v1/workpieces/${payload.workpiece_id}/rightSplit`;
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
