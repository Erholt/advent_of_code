function getGroupEntry(statement, sourceCode) {
  if (statement.type !== "VariableDeclaration" || statement.declarations.length !== 1) return null;
  const [declarator] = statement.declarations;
  const patterns = ["Identifier", "ArrayPattern", "ObjectPattern"];

  if (!patterns.includes(declarator.id.type) || !declarator.init) return null;
  if (declarator.init.loc.end.line > statement.loc.start.line) return null;
  const equalsToken = sourceCode.getTokenAfter(declarator.id);

  if (equalsToken.value !== "=") return null;

  return { statement, declarator, equalsToken };
}

function isAdjacent(entry, previous) {
  return previous &&
    entry.statement.kind === previous.statement.kind &&
    entry.statement.loc.start.line === previous.statement.loc.end.line + 1;
}

function checkGroup(group, context) {
  if (group.length < 2) return;
  const targetColumn = Math.max(...group.map(({ declarator }) => declarator.id.loc.end.column)) + 1;

  for (const { equalsToken } of group) {
    if (equalsToken.loc.start.column !== targetColumn) {
      context.report({ node: equalsToken, messageId: "unaligned" });
    }
  }
}

function addToGroup(group, entry, context) {
  if (entry && group.length && isAdjacent(entry, group[group.length - 1])) {
    return [...group, entry];
  }
  checkGroup(group, context);
  return entry ? [entry] : [];
}

function checkStatementList(statements, sourceCode, context) {
  let group = [];

  for (const statement of statements) {
    group = addToGroup(group, getGroupEntry(statement, sourceCode), context);
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