// index.ts
import stylelint from "stylelint";
var ruleName = "jantimon/stylelint-enforce-pseudo-ampersand";
var messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: function(mode) {
    if (mode === "always") {
      return "Expected pseudo-element to be prefixed with an ampersand";
    } else {
      return "Expected pseudo-element to NOT be prefixed with an ampersand";
    }
  }
});
var meta = {
  url: "https://github.com/jantimon/stylelint-enforce-pseudo-ampersand/blob/main/README.md"
};
var stylelint_selector_no_empty_default = stylelint.createPlugin(ruleName, Object.assign(
  (mode, secondary, context) => {
    function reportError(rule, result) {
      stylelint.utils.report({
        result,
        ruleName,
        message: messages.rejected(mode),
        node: rule,
        word: rule.node
      });
    }
    return function(root, result) {
      if (!mode) {
        return;
      }
      root.walkRules((rule) => {
        let changed = false;
        const fixedSelectors = rule.selectors.map((selector) => {
          const pseudoMatch = selector.match(/^(\s*)(&?)(::?(before|after))/i);
          if (!pseudoMatch) {
            return selector;
          }
          const hasAmpersand = pseudoMatch[2] === "&";
          if (mode === "always" && !hasAmpersand) {
            if (context.fix) {
              changed = true;
              return pseudoMatch[1] + "&" + pseudoMatch[3];
            }
            reportError(rule, result);
          }
          if (mode === "never" && hasAmpersand) {
            if (context.fix) {
              changed = true;
              return pseudoMatch[1] + pseudoMatch[3];
            }
            reportError(rule, result);
          }
          return selector;
        });
        if (context.fix && changed) {
          rule.selectors = fixedSelectors;
        }
      });
    };
  },
  {
    messages,
    ruleName,
    meta
  }
));
export {
  stylelint_selector_no_empty_default as default
};
