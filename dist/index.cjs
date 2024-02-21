var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var stylelint_selector_no_empty_exports = {};
__export(stylelint_selector_no_empty_exports, {
  default: () => stylelint_selector_no_empty_default
});
module.exports = __toCommonJS(stylelint_selector_no_empty_exports);
var import_stylelint = __toESM(require("stylelint"), 1);
var ruleName = "jantimon/stylelint-enforce-pseudo-ampersand";
var messages = import_stylelint.default.utils.ruleMessages(ruleName, {
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
var stylelint_selector_no_empty_default = import_stylelint.default.createPlugin(ruleName, Object.assign(
  (mode, secondary, context) => {
    function reportError(rule, result) {
      import_stylelint.default.utils.report({
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
