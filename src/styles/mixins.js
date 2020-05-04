/**
 * POSTCSS mixins
 * @module styles/mixins
 */
const settings = require('./settings');

// Destructuring imports
const { defaults } = settings;
const { adaptiveFonts, breakpoints, screenHeight } = defaults;

/**
 * Adds adaptive styles to font sizes for small screens, (width below mid break point)
 * @return {object} mixin
 */
const fonts = () => ({
  [`@media only screen and (max-width: ${breakpoints.md}px)`]: {
    'font-size': `calc(${adaptiveFonts.baseSize}px + ${adaptiveFonts.addSize})`
  },
  [`@media only screen and (min-width: ${breakpoints.md}px)`]: {
    'font-size': `${defaults.fontSizePxBase}px`
  }
});

/**
 * Mixin is used for adding shadow styles of different sizes
 * @param {object} mixin - mixin node
 * @param {string} type - shadow descriptor
 * @return {{"box-shadow": string}} - returns mixin content
 */
const shadows = (mixin, type = 'xs') => {
  switch (type) {
    case 'xs':
      return {
        'box-shadow': '0 2px 4px 0 rgba(0,0,0,0.10)'
      };
    case 'md':
      return {
        'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)'
      };
    case 'lg':
      return {
        'box-shadow': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)'
      };
    case 'photo':
      return {
        'box-shadow': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.8)'
      };
    default:
      return {
        'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)'
      };
  }
};

/**
 * Returns media query with provided min&max breakpoint values
 * breakpoints are taken from settings, in case invalid key is provided - returns mixin with default breakpoint
 * If no key or "width" has been passed  - width breakpoints will be used,
 * in other case - "height" set will be applied
 *
 * @param {object} mixin - parent node
 * @param {string} type - width or height type (selects set of breakpoints)
 * @param {string} min - min-width breakpoint key
 * @param {string} max - max-width breakpoint key
 * @return {object} mixin - returns mixin content
 */
const media = (mixin, type = 'width', min = 'xs', max) => {
  const breakPointsSet = type === 'width' ? breakpoints : screenHeight;
  const breakpointKeys = Object.keys(breakPointsSet);

  // prettier-ignore
  const setBreakpoint = (value) => breakpointKeys.includes(value)
    ? breakPointsSet[value]
    : breakPointsSet.xs;

  const minQuery = `@media only screen and (min-${type}: ${setBreakpoint(min)}px)`;
  // prettier-ignore
  const mediaQuery =
    max && breakpointKeys.includes(max)
      ? (`${minQuery} and (max-${type}: ${setBreakpoint(max)}px)`)
      : minQuery;

  return {
    [mediaQuery]: {
      '@mixin-content': {}
    }
  };
};

/**
 * Creates flex mixin with parameters
 * @param {object} mixin - parent node
 * @param {string} direction - flex direction property
 * @param {string} wrap - flex-wrap direction property
 * @return {object} mixin - returns mixin content
 */
const flex = (mixin, direction = 'column', wrap = 'no-wrap') => ({
  display: 'flex',
  'flex-direction': direction,
  'flex-wrap': wrap,
  '@mixin-content': {}
});

const fullCover = () => ({
  'max-width': '100%',
  'max-height': '100%',
  width: '100%',
  height: '100%'
});

/**
 * Returns button mixin
 * @param {object} mixin - parent node
 * @param {string} bg - background color
 * @param {string} color - text color
 * @param {string} bgHover - hover&focus color
 * @return {{color: *, background: *, border: *, "&:hover, &:focus": {cursor: string, background: *}}}
 *    returns mixin content
 */
const button = (mixin, bg, color, bgHover) => ({
  background: bg,
  color,
  border: 0,

  '&:hover, &:focus': {
    background: bgHover,
    cursor: 'pointer',
    border: 0
  }
});

const customButton = (mixin, type = 'text', width = '100%', height = '100%') => {
  const styleSet = {
    'background-color': 'transparent',
    border: '1px solid transparent',
    'border-radius': '4px',
    outline: 0,

    '&:hover': {
      'background-color': 'transparent',
      border: '1px solid transparent',
      cursor: 'pointer',
      outline: 0
    },

    '&:focus': {
      outline: '1px dotted gray'
    }
  };

  if (type === 'icon') {
    Object.assign(styleSet, {
      width,
      height
    });
  }

  return styleSet;
};

/**
 * Applies styles to add fade-in-top animation with properties
 * @param {object} mixin - parent node
 * @param {string} name - animation name
 * @param {number} delay - transition delay
 * @return {object} mixin - returns mixin content
 */
const animate = (mixin, name = 'fade-in-top', delay = 1) => ({
  animation: `${name} ${delay}s ease`,
  'animation-iteration-count': 1,
  'transform-origin': '50% 50%',
  'animation-fill-mode': 'forwards',
  '@mixin-content': {}
});

/**
 * Applies styles to remove content loader from the viewport
 * @param {object} mixin - parent node
 * @param {number} delay - transition delay
 * @return {{"@mixin-content": {}, top: string, opacity: number, transition: string, height: number}}
 *    returns mixin content
 */
const fadeOutLoader = (mixin, delay) => ({
  height: 0,
  opacity: 0,
  top: '50%',
  transition: `all ${delay}s ease-in-out`,
  '@mixin-content': {}
});

/**
 * Adds main golden canon grid properties to a node, 20x20 grid to be used on the page
 * @param {object} mixin - parent node
 * @param {string} type - type setting (default is 'golden' 20x20 grid)
 * @return {object} mixin - returns mixin content
 */
const fullScreenGrid = (mixin, type = 'golden') => {
  const styleSet = {
    display: 'grid',
    position: 'relative',
    height: '100vh',
    width: '100%',
    '@mixin-content': {}
  };

  if (type === 'golden') {
    Object.assign(styleSet, {
      'grid-template-rows':
        // eslint-disable-next-line max-len
        '1fr 1fr 2fr 4fr 2.66fr 5.33fr 5.33fr 4.33fr 2.83fr 3.5fr 3.5fr 2.83fr 4.33fr 5.33fr 5.33fr 2.66fr 4fr 2fr 1fr 1fr',
      'grid-template-columns':
        // eslint-disable-next-line max-len
        '1fr 1fr 2fr 4fr 2.66fr 5.33fr 5.33fr 4.33fr 2.83fr 3.5fr 3.5fr 2.83fr 4.33fr 5.33fr 5.33fr 2.66fr 4fr 2fr 1fr 1fr'
    });
  }

  return styleSet;
};

module.exports = {
  shadows,
  fonts,
  media,
  button,
  customButton,
  animate,
  fadeOutLoader,
  fullScreenGrid,
  flex,
  fullCover
};
