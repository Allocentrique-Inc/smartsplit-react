export default (performance) => {
  console.log('SETTING ERRORS');
  const arr = performance.map((el, id) => {
    el.errors = [];
    if (el.status === '') {
      el.errors.push('shouldHaveStatus');
    }
    return el;
  });
  return arr;
};
