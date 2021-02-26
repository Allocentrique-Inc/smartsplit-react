export default (recording) => {
  const arr = recording.map((el, id) => {
    el.errors = [];
    if (!el.function) {
      el.errors.push('shouldHaveFunction');
    }
    return el;
  });
  return arr;
};
