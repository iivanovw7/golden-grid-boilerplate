import './styles/main.pcss';

import registerServiceWorker from './utils/register-service-worker';
import Sidebar from './assets/js/sidebar';
import * as utils from './utils';

window.onload = () => {
  const userData = document.querySelector('.users-data');

  if (userData) {
    userData.innerHTML = `<div>${userData}</div>`;
  }

  // eslint-disable-next-line no-undef
  setCurrentPage('2');
  Sidebar.listen();
};

utils.requireAll(require.context('./assets/svg', true, /\.svg$/));
utils.requireAll(require.context('./assets/img', true, /\.(jpg|jpeg|png)$/));

module.hot.accept();
registerServiceWorker();
// https://extri.co/2017/07/11/generating-multiple-html-pages-with-htmlwebpackplugin/
// https://www.freecodecamp.org/news/make-multipage-html-development-suck-less-with-pug-fb23bc8e7874/
// https://tocode.ru/curses/nastroika-webpack4/webpack-dlya-verstki-pug
