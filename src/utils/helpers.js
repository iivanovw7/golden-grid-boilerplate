/**
 * Module contains common helper functions
 * @module utils/helpers
 */

/**
 * Requires all files in a directory
 * @param {*} r require.context
 * @return {void}
 */
export function requireAll(r) {
  r.keys().forEach(r);
}

export default requireAll;
