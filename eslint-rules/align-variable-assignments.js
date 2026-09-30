function getVariableDeclarator(statement) {
  if (
    statement.type !== "VariableDeclaration" ||
    statement.declarations.length !== 1
  ) {
    return null;
  }

  const [declarator] = statement.declarations;
  if (
    !["Identifier", "ArrayPattern", "ObjectPattern"].includes(declarator.id.type) ||
    declarator.init === null
  ) {
    return null;
  }

  return declarator;
}

function getEqualsToken(sourceCode, declarator) {
  const token = sourceCode.getTokenAfter(declarator.id);
  return token.value === "=" ? token : null;
}

function checkStatementList(statements, sourceCode, context) {
  let group = [];

  function checkGroup() {
    if (group.length < 2) {
      group = [];
      return;
    }

    const targetColumn = Math.max(
      ...group.map(({ declarator }) => declarator.id.loc.end.column)
    ) + 1;

    for (const { equalsToken } of group) {
      if (equalsToken.loc.start.column !== targetColumn) {
        context.report({
          node: equalsToken,
          messageId: "unaligned"
        });
      }
    }

    group = [];
  }

  for (const statement of statements) {
    const declarator = getVariableDeclarator(statement);
    const equalsToken = declarator && getEqualsToken(sourceCode, declarator);

    if (!declarator || !equalsToken) {
      checkGroup();
      continue;
    }

    if (declarator.init.loc.end.line > statement.loc.start.line) {
      checkGroup();
      continue;
    }

    const previous = group[group.length - 1];
    const continuesGroup = previous &&
      statement.kind === previous.statement.kind &&
      statement.loc.start.line === previous.statement.loc.end.line + 1;

    if (!continuesGroup) {
      checkGroup();
    }

    group.push({ statement, declarator, equalsToken });
  }

  checkGroup();
}

module.exports = {
  meta: {
    type: "layout",
    docs: {
      description: "align equals signs in consecutive variable declarations"
    },
    schema: [],
    messages: {
      unaligned: "Align '=' with the other variable declarations in this group."
    }
  },
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      "Program:exit"(node) {
        checkStatementList(node.body, sourceCode, context);
      },
      "BlockStatement:exit"(node) {
        checkStatementList(node.body, sourceCode, context);
      },
      "SwitchCase:exit"(node) {
        checkStatementList(node.consequent, sourceCode, context);
      }
    };
  }
};