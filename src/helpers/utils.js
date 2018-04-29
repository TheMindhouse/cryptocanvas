/**
 * Group items by key
 * @param xs - array of objects
 * @param f - property by which should we group
 * @return {*}
 */
export const groupBy = (xs, f) => {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}