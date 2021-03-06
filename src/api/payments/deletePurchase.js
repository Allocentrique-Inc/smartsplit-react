const deletePurchase = async (purchase) => {
  try {
    const url = `http://localhost:3001/v1/users/${purchase.user_id}/purchases/${purchase.purchase_id}`;
    const method = 'DELETE';
    const bearer = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = await fetch(url, {
      method,
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
    return { errors: ["Can't reach server"] };
  }
};
export default deletePurchase;
