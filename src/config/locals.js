/**
 * Data imported in all PUG templates via webpack during compilation
 * @module config/locals
 */

/**
 * Templates configuration object
 * @type {object}
 * @property {boolean} spinner - enables main viewport loader animation (spinner)
 * @property {object} home - home page content configurations
 * @property {Array<*>} navigation - website navigation structure
 * @property {Array<*>} social - set of social icons to be used in mixin
 *
 */
const Locals = {
  /**
   * Enable pages loader animation
   * @type {boolean}
   */
  spinner: true,
  /**
   * Home page content
   * @type {Object}
   * @property {string} name - home page "name" content
   * @property {string} surname - home page "surname" content
   * @property {string} profession - text displayed below surname
   * @property {Object} menuLink_1 - home page menu quick link config
   * @property {Object} menuLink_2 - home page menu quick link config
   * @property {Object} profileLink - home page profile link config
   */
  home: {
    name: 'Georgina',
    surname: 'Alson',
    profession: 'YUNG MODEL 2020',
    menuLink_1: {
      link: '/',
      name: 'CLIENTS'
    },
    menuLink_2: {
      link: '/',
      name: 'NEWS'
    },
    profileLink: {
      link: '/',
      name: 'VIEW PROFILE'
    }
  },
  /**
   * Website navigation menu configuration
   * @type {Array<Object>}
   */
  navigation: [
    /**
     * Single navigation link
     * @type {Object}
     * @property {string} title - link title for navigation menu
     * @property {string} link - actual redirect target
     */
    {
      title: 'Home',
      link: '/index.html'
    },
    {
      title: 'Profile',
      link: '/profile.html'
    },
    {
      title: 'Contact',
      link: '/contact.html'
    },
    {
      title: 'Client',
      link: '/client.html'
    },
    {
      title: 'News',
      link: '/news.html'
    },
    {
      title: 'Single Blog',
      link: '/single-blog.html'
    },
    {
      title: 'About',
      link: '/about.html'
    }
  ],
  /**
   * Website home page social links
   * @type {Array<Object>}
   */
  social: [
    /**
     * Single social SVG symbol link prop
     * @type {Object}
     * @property {string} id - used to find SVG icon
     * @property {string} title - SVG icon name
     */
    {
      id: '#facebook',
      title: 'facebook'
    },
    {
      id: '#instagram',
      title: 'instagram'
    },
    {
      id: '#youtube',
      title: 'youtube'
    },
    {
      id: '#twitter',
      title: 'twitter'
    }
  ]
};

module.exports = Locals;
