import 'cross-fetch/polyfill';
import pug from 'pug';
import path from 'path';
import chalk from 'chalk';
import * as mocks from '../../__mocks__';

const templatePath = path.resolve(__dirname, '../../layouts/base.pug');
const renderPug = (data) => pug.renderFile(templatePath, data);

describe(`Testing [${chalk.yellowBright('base')}] template`, () => {
  it('Should render and match snapshot', () => {
    expect(renderPug(mocks.meta)).toMatchSnapshot();
  });
});
