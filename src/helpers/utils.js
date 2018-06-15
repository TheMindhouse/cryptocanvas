import { CONFIG } from '../config'

export const setDocumentTitle = (title) => {
  document.title = title
    ? `${title} | ${CONFIG.PAGE_TITLE}`
    : CONFIG.PAGE_TITLE
}