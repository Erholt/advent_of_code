function isSingleVariableDeclaration(statement) {
  return statement.type === "VariableDeclaration" &&
    statement.declarations.length === 1;
}

function isSupportedPattern(pattern) {
  return ["Identifier", "ArrayPattern", "ObjectPattern"].includes(pattern.type);
}

function getVariableDeclarator(statement) {
  if (!isSingleVariableDeclaration(statement)) return null;
  const [declarator] = statement.declarations;
  if (!isSupportedPattern(declarator.id) || declarator.init === null) return null;

  return declarator;
}

function getEqualsToken(sourceCode, declarator) {
  const token = sourceCode.getTokenAfter(declarator.id);

  return token.value === "=" ? token : null;
}

function isMultilineInitializer(statement, declarator) {
  return declarator.init.loc.end.line > statement.loc.start.line;
}

function getGroupEntry(statement, sourceCode) {
  const declarator = getVariableDeclarator(statement);
  if (!declarator || isMultilineInitializer(statement, declarator)) return null;
  const equalsToken = getEqualsToken(sourceCode, declarator);

  return equalsToken ? { statement, declarator, equalsToken } : null;
}

function getTargetColumn(group) {
  return Math.max(...group.map(({ declarator }) => declarator.id.loc.end.column)) + 1;
}

function reportIfMisaligned(entry, targetColumn, context) {
  if (entry.equalsToken.loc.start.column === targetColumn) return;
  context.report({ node: entry.equalsToken, messageId: "unaligned" });
}

function checkGroup(group, context) {
  if (group.length < 2) return [];
  const targetColumn = getTargetColumn(group);
  for (const entry of group) reportIfMisaligned(entry, targetColumn, context);

  return [];
}

function continuesGroup(statement, previous) {
  return previous !== undefined &&
    statement.kind === previous.kind &&
    statement.loc.start.line === previous.loc.end.line + 1;
}

function appendToGroup(group, entry, context) {
  const previous = group[group.length - 1]?.statement;
  if (!continuesGroup(entry.statement, previous)) group = checkGroup(group, context);

  return [...group, entry];
}

function processStatement(statement, group, sourceCode, context) {
  const entry = getGroupEntry(statement, sourceCode);

  return entry ? appendToGroup(group, entry, context) : checkGroup(group, context);
}

function checkStatementList(statements, sourceCode, context) {
  let group = [];
  for (const statement of statements) {
    group = processStatement(statement, group, sourceCode, context);
  }
  checkGroup(group, context);
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
      "Program:exit": node => checkStatementList(node.body, sourceCode, context),
      "BlockStatement:exit": node => checkStatementList(node.body, sourceCode, context),
      "SwitchCase:exit": node => checkStatementList(node.consequent, sourceCode, context)
    };
  }
};