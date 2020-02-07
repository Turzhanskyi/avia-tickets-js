import { format } from "date-fns";

/**
 *
 * @param {string} str
 * @param {string} type
 * @returns 'dd MMM yyy hh:mm'
 *
 */

export function formatDate(str, type) {
  const date = new Date(str);
  return format(date, type);
}
