/**
 * Module contains side bar functionality
 * @module assets/js/sidebar
 */
import helpers from './utils/helpers';
import events from './constants/events';

const Sidebar = function Sidebar() {
  /**
   * Creates event listeners needed to control sidebar animation functions (open/close)
   * @return {void}
   */
  Sidebar.prototype.listen = function listen() {
    const sidebar = document.getElementById('sidebar');
    const btn = document.getElementById('sidebar-btn');
    const mask = document.getElementById('sidebar-mask');

    btn.addEventListener(events.CLICK, () => {
      return sidebar.classList.contains('is-hidden')
        ? helpers.swapClassName(sidebar, 'is-hidden', 'is-opened')
        : helpers.swapClassName(sidebar, 'is-closed', 'is-opened');
    });

    mask.addEventListener(events.CLICK, () => {
      helpers.swapClassName(sidebar, 'is-opened', 'is-closed');
    });
  };
};

// Ensure Singleton has one instance
const instance = new Sidebar();
Object.freeze(instance);

export default instance;
