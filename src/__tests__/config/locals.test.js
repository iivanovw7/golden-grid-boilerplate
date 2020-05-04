import 'cross-fetch/polyfill';
import chalk from 'chalk';

import Locals from '../../config/locals';

describe(`Testing application [${chalk.yellowBright('locals')}] config:`, () => {
  it('Should contain spinner config parameter', () => {
    expect(Locals.spinner).not.toBe(undefined);
  });
  it('Should contain home config parameter', () => {
    expect(Locals.home).not.toBe(undefined);
    expect(Locals.home).toHaveProperty('name');
    expect(Locals.home).toHaveProperty('surname');
  });
  it('Should contain navigation config parameter', () => {
    expect(Locals.navigation).not.toBe(undefined);
    expect(Locals.navigation.length).toBeGreaterThan(0);
    expect(Locals.navigation[0]).toHaveProperty('title', 'Home');
    expect(Locals.navigation[0]).toHaveProperty('link', '/index.html');
  });
  it('Should contain social config parameter', () => {
    expect(Locals.social).not.toBe(undefined);
    expect(Locals.social.length).toBeGreaterThan(0);
    expect(Locals.social[0]).toHaveProperty('id', '#facebook');
    expect(Locals.social[0]).toHaveProperty('title', 'facebook');
  });
});
