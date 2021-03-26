export default (recording) => {
  recording.forEach((el, id) => {
    el.errors = [];
    if (!el.function) {
      el.errors.push('shouldHaveFunction');
    }
    return el;
  });
};
