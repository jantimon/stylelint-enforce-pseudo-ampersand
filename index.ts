import stylelint, { type PostcssResult, type RuleContext } from "stylelint";
import type * as PostCSS from 'postcss';

const ruleName = "jantimon/stylelint-enforce-pseudo-ampersand";
const nearestSelector = "";
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: function(mode: "always" | "never" ) {

    if (mode === "always") {
      return "Expected pseudo-element to be prefixed with an ampersand";
    } else {
      return "Expected pseudo-element to NOT be prefixed with an ampersand";
    }
  }
});

const meta = {
  url: "https://github.com/jantimon/stylelint-enforce-pseudo-ampersand/blob/main/README.md"
};


export default stylelint.createPlugin(ruleName, Object.assign((mode: "always" | "never" | undefined, secondary: {}, context: RuleContext) => {

  function reportError(rule, result) {
    stylelint.utils.report({
      result,
      ruleName,
      message: messages.rejected(mode as "always" | "never"),
      node: rule,
      word: rule.node
    });
  }


  return function(root: PostCSS.Root, result: PostcssResult) {
    if (!mode) {
      return;
    }

    root.walkRules(rule => {

      let changed = false;
      const fixedSelectors = rule.selectors.map(selector => {
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
  }
}, 
{
  messages,
  ruleName,
  meta
}));
