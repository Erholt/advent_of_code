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
      "max-len": ["error", { code: 120 }]
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