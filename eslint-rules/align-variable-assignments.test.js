let { RuleTester } = require("eslint");
let rule           = require("./align-variable-assignments");

let ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "script"
  }
});

ruleTester.run("align-variable-assignments", rule, {
  valid: [
    'const fs   = require("fs");\nconst path = require("path");',
    "let [fooX, fooY] = a;\nlet [barX, barY] = b;",
    [
      "let [, action, start, end] =",
      "  getAction();",
      "",
      "let [startX, startY] = values;",
      "let [endX, endY]     = otherValues;"
    ].join("\n"),
    "const short = 1;\n\nconst longer = 2;",
    "const short = 1;\nrun();\nconst longer = 2;",
    "const first =\n  makeValue();\nconst longer = 2;",
    "const single = 1;"
  ],
  invalid: [
    {
      code: "const short = 1;\nconst longer = 2;",
      errors: [{ messageId: "unaligned" }]
    },
    {
      code: [
        "let [, action, start, end] =",
        "  getAction();",
        "",
        "let [startX, startY] = values;",
        "let [endX, endY] = otherValues;"
      ].join("\n"),
      errors: [{ messageId: "unaligned" }]
    }
  ]
});