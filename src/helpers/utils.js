/**
 * Group items by key
 * @param xs - array of objects
 * @param f - property by which should we group
 * @return {*}
 */
import { CONFIG } from '../config'

export const groupBy = (xs, f) => {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}


export const setDocumentTitle = (title) => {
  document.title = title
    ? `${title} | ${CONFIG.PAGE_TITLE}`
    : CONFIG.PAGE_TITLE
}