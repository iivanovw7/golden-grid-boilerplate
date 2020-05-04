const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    node: 1,
    browser: 1,
    jest: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "airbnb",
    "prettier",
    "guard/jsdoc"
  ],
  plugins: [
    "prettier"
  ],
  globals: {
    "exampleGlobalVariable": true
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    strict: 1,
    "no-plusplus": ["error", {
      allowForLoopAfterthoughts: true
    }
    ],
    "max-len": [2, {"code": 120}],
    eqeqeq: 1,
    "react/require-render-return": "off",
    "consistent-return": ["off", { "treatUndefinedAsUnspecified": true }],
    "comma-dangle": ["error", "never"],
    semi: ["error", "always"],
    quotes: ["error", "single"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: false
      }
    ],
    indent: ["error", 2, {"SwitchCase": 1}],
    "no-tabs": 0
  },
  settings: {
    "import/extensions": [
      ".js"
    ]
  },
  parserOptions: {
    ecmaFeatures: {
      "modules": true
    }
  }
};
