import { testRule } from "stylelint-test-rule-node";
import plugin from "../dist/index.js";

const {
  rule: { messages, ruleName }
} = plugin;

testRule({
  description: "should pass when using & with :before",
  plugins: [plugin],
  ruleName,
  config: "always",
  fix: true,

  accept: [
    {
      description: "should pass when using & with :before",
      code: ".foo { &:before { content: 'foo'; } }"
    },
    { 
      description: "should pass when using & with :after",
      code: ".foo { &:after { content: 'foo'; } }"
    },
    {
      description: "should pass when using & with ::before",
      code: ".foo { &::before { content: 'foo'; } }"
    },
    { 
      description: "should pass when using & with ::after",
      code: ".foo { &::after { content: 'foo'; } }"
    },
    
  ],

  reject: [
    {
      description: "should fail when using :before without &",
      code: ".foo { :before { content: 'foo'; } }",
      fixed: ".foo { &:before { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
      error: true,
    },
    {
      description: "should fail when using :after without &",
      code: ".foo { :after { content: 'foo'; } }",
      fixed: ".foo { &:after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
      error: true,
    },
    {
      description: "should fail when using ::before without &",
      code: ".foo { ::before { content: 'foo'; } }",
      fixed: ".foo { &::before { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
      error: true,
    },
    {
      description: "should fail when using ::after without &",
      code: ".foo { ::after { content: 'foo'; } }",
      fixed: ".foo { &::after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
      error: true,
    }
  ]
});