/**
 * POSTCSS settings
 * @module styles/settings
 */

/**
 * Default styles config
 * @type {object}
 * @property {number} fontSizePxBase - base font size
 * @property {string}
 *  firstColor, secondColor, thirdColor, fifthColor, bgColor, bgHomeColor_1, bgHomeColor_2 - app color set
 * @property {string} defaultTextColor, primaryColor, secondaryTextColor, linkColor - text colors
 * @property {string} titleFontLocal - "title" font family name
 * @property {string} titleFontFamily - "title" font family full style property
 * @property {string} titleFontLocalTtf - "title" local Ttf fonts
 * @property {string} titleFontLocalOtf - "title" local Otf fonts
 * @property {string} titleGoogleFont - "title" google fonts link, to be used as fallback
 * @property {string} baseFontLocal - "base" font family name
 * @property {string} baseFontFamily - "base" font family full style property
 * @property {string} baseFontLocalExtraBoldTtf - "base" local extra bold local Ttf fonts
 * @property {string} baseFontLocalSemiBoldTtf - "base" semi bold local Ttf fonts
 * @property {string} baseGoogleFont - "base" google fonts link, to be used as fallback
 * @property {string} goldenGrid - golden grid structure helper (could be connected as page background)
 * @property {number} light, regular, bold, extraBold - font weights
 * @property {object<*>} adaptiveFonts - props used in adaptive fonts calculations
 * @property {object<*>} breakpoints - screen width config, main breakpoints used in media queries
 * @property {object<*>} screenHeight - screen height config, also used in media queries
 * @property {object<*>} zIndexes - Set of elements z-indexes uses in styles
 * @property {string<*>} sideBarWidth - side bar width in px
 *
 */
const defaults = {
  // Base font size in px
  fontSizePxBase: 16,

  firstColor: 'rgb(180, 211, 211)',
  secondColor: 'rgb(226, 232, 232)',
  thirdColor: 'rgb(226, 232, 232)',
  fourthColor: 'rgb(211, 220, 220)',
  fifthColor: 'rgb(3, 4, 9)',

  bgHomeColor_1: 'rgb(217,231,231)',
  bgHomeColor_2: 'rgb(180,211,211)',
  bgColor: 'rgb(255, 255, 255)',

  defaultTextColor: 'rgb(26, 26, 29)',
  primaryColor: 'rgb(135, 187, 188)',
  secondaryTextColor: 'rgb(119, 119, 126)',
  linkColor: 'rgb(105, 105, 112)',

  // Fonts related properties
  titleFontLocal: 'Poppins',
  titleFontFamily: '"Poppins", sans-serif, Fallback, sans-serif',
  titleFontLocalTtf: '../../fonts/Poppins-Regular.ttf',
  titleFontLocalOtf: '../../fonts/Poppins-Regular.otf',
  titleGoogleFont: 'https://fonts.googleapis.com/css?family=Poppins&display=swap',

  baseFontLocal: 'Nunito',
  baseFontFamily: '"Nunito", sans-serif, Fallback, sans-serif',
  baseFontLocalExtraBoldTtf: '../../fonts/Nunito-ExtraBold.ttf',
  baseFontLocalSemiBoldTtf: '../../fonts/Nunito-SemiBold.ttf',
  baseGoogleFont: 'https://fonts.googleapis.com/css?family=Nunito:600,800&display=swap',

  // golden grid path, could be used as screen background image
  goldenGrid: '../../img/golden-grid-1920.png',

  // Font wights
  light: 100,
  regular: 400,
  bold: 600,
  extraBold: 800,

  // Adaptive font-size configuration
  adaptiveFonts: {
    baseSize: 12,

    // Value added to a current base font size
    addSize: '.3vw'
  },

  // Screen breakpoints in px (width)
  breakpoints: {
    xs: 0,
    sm: 767,
    md: 928,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  },

  screenHeight: {
    xs: 0,
    sm: 568, // iPhone 5
    md: 640, // Samsung Galaxy S3
    lg: 667, // iPhone 6, 7, 8
    xl: 736, // iPhone 6+, 7+, 8+
    xxl: 812, // iPhone X
    xxxl: 896 // iPhone XS Max, XR
  },

  // Set of elements z-indexes uses in styles
  zIndexes: {
    default: 10,
    sidebarContent: 200,
    sidebarMask: 200,
    sidebar: 100,
    homeBg_1: 5,
    homeBg_2: 6,
    homeLogo: 15,
    homeSearch: 15,
    homeNav: 20,
    homeSocial: 15,
    homeLink: 20,
    homeMainTitle: 20,
    homeSecondaryTitle: 20,
    homeProfile: 20,
    homePlay: 20
  },

  // Home screen sidebar width in px
  sideBarWidth: '250px'
};

module.exports = {
  defaults
};
