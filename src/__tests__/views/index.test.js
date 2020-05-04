import 'cross-fetch/polyfill';
import pug from 'pug';
import path from 'path';
import chalk from 'chalk';
import * as mocks from '../../__mocks__';

const renderPug = (data) => pug.renderFile(path.resolve(__dirname, '../../views/index.pug'), data);

describe(`Testing view: [${chalk.yellowBright('index')}]`, () => {
  it('Should render and match snapshot', () => {
    expect(renderPug(mocks.meta)).toMatchSnapshot();
  });
});
