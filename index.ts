import stylelint, { type PostcssResult } from "stylelint";
import type * as PostCSS from 'postcss';

const ruleName = "jantimon/stylelint-enforce-pseudo-ampersand";
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
  url: "https://github.com/jantimon/stylelint-enforce-pseudo-ampersand/blob/main/README.md",
  fixable: true
};


export default stylelint.createPlugin(ruleName, Object.assign((mode: "always" | "never" | undefined) => {

  return function(root: PostCSS.Root, result: PostcssResult) {
    if (!mode) {
      return;
    }

    root.walkRules(rule => {
      rule.selectors.forEach((selector, index) => {
        const pseudoMatch = selector.match(/^(\s*)(&?)(::?(before|after))/i);
        if (!pseudoMatch) {
          return;
        }
        const hasAmpersand = pseudoMatch[2] === "&";
        if ((mode === "always") === hasAmpersand) {
          return;
        }
        const prefix = pseudoMatch[1] + (mode === "always" ? "&" : "") + pseudoMatch[3];
        stylelint.utils.report({
          result,
          ruleName,
          message: messages.rejected(mode),
          node: rule,
          word: selector,
          fix: () => {
            const selectors = [...rule.selectors];
            selectors[index] = prefix + selector.slice(pseudoMatch[0].length);
            rule.selectors = selectors;
          }
        });
      });
    });
  }
},
{
  messages,
  ruleName,
  meta
}));
