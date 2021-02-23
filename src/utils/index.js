export function loadObjToAnother(from, to) {
  Object.keys(to).forEach((key) => {
    if (from[key]) {
      to[key] = from[key];
    }
  });
}
