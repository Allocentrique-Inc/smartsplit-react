import config from '../../config';

const createPurchase = async (purchase) => {
  try {
    const url = `${config.apiUrl}/users/${purchase.user_id}/purchases/`;
    const method = 'POST';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: bearer,
      },
      body: JSON.stringify(purchase),
    });
    const textResponse = await response.text();
    const parsedResponse = JSON.parse(textResponse);
    console.log(parsedResponse);
    return parsedResponse;
  } catch (err) {
    console.log(err);
    return { errors: ["Can't reach server"] };
  }
};

export default createPurchase;
