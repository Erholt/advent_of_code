const js = require("@eslint/js");
const globals = require("globals");
const alignVariableAssignments = require("./eslint-rules/align-variable-assignments");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node
    },
    rules: {
      "max-len": ["error", { code: 120 }],
      "max-lines-per-function": ["error", { max: 10, skipBlankLines: true }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: ["if", "for", "while", "do", "switch", "try", "with", "return", "throw"]
        }
      ]
    }
  },
  {
    files: ["**/test.js", "**/*.test.js"],
    rules: {
      "max-lines-per-function": "off"
    }
  },
  {
    files: ["javascript/**/*.js"],
    plugins: {
      local: {
        rules: {
          "align-variable-assignments": alignVariableAssignments
        }
      }
    },
    rules: {
      "local/align-variable-assignments": "error"
    }
  }
];