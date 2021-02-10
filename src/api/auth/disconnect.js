const disconnect = () => {
  localStorage.setItem('user_id', '');
  localStorage.setItem('accessToken', '');
};

export default disconnect;
