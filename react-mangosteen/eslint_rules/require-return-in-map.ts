module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure return in map function",
      category: "Best Practices",
      recommended: true,
    },
    fixable: "code",
    schema: [], // no options
  },
  create(context) {
    return {
      "CallExpression[callee.property.name=\"map\"]": (node) => {
        const callback = node.arguments[0];
        if (callback && callback.type === "FunctionExpression" || callback.type === "ArrowFunctionExpression") {
          if (callback.body.type === "BlockStatement") {
            const hasReturn = callback.body.body.some(statement => statement.type === "ReturnStatement");
            if (!hasReturn) {
              context.report({
                node: callback,
                message: "Expected to return a value in the map function.",
              });
            }
          } else if (callback.body.type !== "ReturnStatement") {
            context.report({
              node: callback,
              message: "Expected to return a value in the map function.",
            });
          }
        }
      },
    };
  },
};