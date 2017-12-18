module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "plugins": [
    "flowtype",
    "import"
  ],
  "rules": {
    "function-paren-newline": ["error", "never"],
    "quote-props": ["error", "as-needed"],
    "no-underscore-dangle": [0],
    "generator-star-spacing": [ 0 ],
    "no-duplicate-imports": [ 0 ],
    "complexity": [
      2,
      7
    ],
    "indent": [
      2
    ],
    "no-console": [
      0
    ],
    "max-len": [
      2,
      120
    ],
    "spaced-comment": [
      0
    ],
    "flowtype/no-dupe-keys": 2,
    "flowtype/no-weak-types": [
      1,
      {
        "any": true,
        "Object": false,
        "Function": false
      }
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/require-parameter-type": 1,
    "flowtype/type-id-match": [
      1,
      "^([A-Z][A-Za-z0-9]+)+Type$"
    ],
    "flowtype/use-flow-type": 1,
    "require-jsdoc": [
      "warn",
      {
        "require": {
          "FunctionDeclaration": false,
          "MethodDefinition": false,
          "ClassDeclaration": false,
          "ArrowFunctionExpression": false
        }
      }
    ],
    "valid-jsdoc": 2,
    "new-cap": [
      2,
      {
        "capIsNewExceptions": [
          "Map",
          "List",
          "Record"
        ]
      }
    ],
    "react/jsx-filename-extension": [
      0
    ],
    "react/jsx-indent": [
      2
    ],
    "react/jsx-no-bind": [
      0
    ],
    "react/jsx-indent-props": [
      2
    ],
    "react/jsx-first-prop-new-line": [2, "never"],
    "react/no-array-index-key": ["error", "never"]
  },
  "globals": {
    "fetch": false,
    "injectedAppConfiguration": false
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
}

  