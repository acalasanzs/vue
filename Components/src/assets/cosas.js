function range(from, to, step = 1) {
  let r = [];
  let c = from;
  while (c < to) {
    r.push(c);
    c += step;
  }
  return r;
}
export { range };
