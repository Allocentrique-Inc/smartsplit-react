import config from '../../config';

const voteRightSplit = async (payload) => {
  const { copyright, performance, recording, privacy, label } = payload;
  const body = JSON.stringify({
    copyright: copyright.vote ? copyright : undefined,
    performance: performance.vote ? performance : undefined,
    recording: recording.vote ? recording : undefined,
    privacy: privacy.vote ? privacy : undefined,
    label: label.vote ? label : undefined,
  });

  try {
    const url = `${config.apiUrl}/workpieces/${payload.workpiece_id}/rightSplit/vote`;
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
