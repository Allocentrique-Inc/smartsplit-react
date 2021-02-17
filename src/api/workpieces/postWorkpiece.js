const postWorkpiece = async (payload) => {
  console.log('PAYTIME MOTHERFUCKER', payload);
  const body = new FormData();
  body.append('title', payload.title);
  body.append('type', payload.type);
  body.append('file', payload.file);
  console.log('POSTINNN WITH SAM WORKPIECE DATTA YO', body);
  try {
    const url = 'http://localhost:3001/v1/workpieces/';
    const method = 'POST';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      body,
      headers: {
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

export default postWorkpiece;
