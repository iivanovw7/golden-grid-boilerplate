import 'cross-fetch/polyfill';
import chalk from 'chalk';

import helpers from '../../../../assets/js/utils/helpers';

describe(`Testing [${chalk.yellowBright('helpers')}] functions:`, () => {
  describe(`[${chalk.yellowBright('swapClassName')}]`, () => {
    beforeEach(() => {
      document.body.innerHTML = '<span id="username" class="test" />';
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    // eslint-disable-next-line require-jsdoc
    function checkClass(node, className, expected) {
      expect(node.classList.contains(className)).toBe(expected);
    }

    it('Should add class to a DOM element', () => {
      const node = document.getElementById('username');
      helpers.swapClassName(node, 'test', 'mock');
      checkClass(node, 'mock', true);
      checkClass(node, 'test', false);
    });

    it('Should add new class name if target name is not present in list', () => {
      const node = document.getElementById('username');
      helpers.swapClassName(node, 'test2', 'mock');
      checkClass(node, 'test', true);
      checkClass(node, 'mock', true);
    });
  });
});
