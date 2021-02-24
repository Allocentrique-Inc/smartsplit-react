export default (copyright) => {
  console.log('SETTING ERRORS');
  const arr = copyright.map((el, id) => {
    el.errors = [];
    if (el.roles.length === 0) {
      el.errors.push('shouldIncludeAtLeastOneRole');
    }
    return el;
  });
  return arr;
};
