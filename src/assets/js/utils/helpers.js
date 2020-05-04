/**
 * Module contains helper functions
 * @module assets/js/utils/helpers
 */

/**
 * Tries changing selected DOM node class name with another one, if  node has it,
 * if not - adds class name in classList
 *
 * @param {object} node - DOM element
 * @param {string} target - class name to be changed
 * @param {string} className -  class name target will be changed with
 * @return {void}
 */
function swapClassName(node, target, className) {
  // prettier-ignore
  return node.classList.contains(target)
    ? node.classList.replace(target, className)
    : node.classList.add(className);
}

export default { swapClassName };
