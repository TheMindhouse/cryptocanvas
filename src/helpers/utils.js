import { CONFIG } from '../config'

export const setDocumentTitle = (title) => {
  document.title = title
    ? `${title} | ${CONFIG.PAGE_TITLE}`
    : CONFIG.PAGE_TITLE
}

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
export const chunkArray = (myArray: Array<any>, chunkSize: number): Array<Array<any>> => {
  const results = []

  while (myArray.length) {
    results.push(myArray.splice(0, chunkSize))
  }

  return results
}