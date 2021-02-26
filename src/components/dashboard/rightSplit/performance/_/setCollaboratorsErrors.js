export default (performance) => {
  const arr = performance.map((el, id) => {
    el.errors = [];
    if (el.status === '') {
      el.errors.push('shouldHaveStatus');
    }
    return el;
  });
  return arr;
};
