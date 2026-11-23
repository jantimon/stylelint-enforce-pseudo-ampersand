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
    },
    {
      description: "should fail when using :after without &",
      code: ".foo { :after { content: 'foo'; } }",
      fixed: ".foo { &:after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
    },
    {
      description: "should fail when using ::before without &",
      code: ".foo { ::before { content: 'foo'; } }",
      fixed: ".foo { &::before { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
    },
    {
      description: "should fail when using ::after without &",
      code: ".foo { ::after { content: 'foo'; } }",
      fixed: ".foo { &::after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") }
      ],
    },
    {
      description: "should fix every selector in a list",
      code: ".foo { :before, .bar, ::after { content: 'foo'; } }",
      fixed: ".foo { &:before, .bar, &::after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("always") },
        { message: messages.rejected("always") }
      ],
    }
  ]
});

testRule({
  description: "should pass when using & with :before",
  plugins: [plugin],
  ruleName,
  config: "never",
  fix: true,

  accept: [
    {
      description: "should pass when using :before without &",
      code: ".foo { :before { content: 'foo'; } }"
    },
    { 
      description: "should pass when using :after without &",
      code: ".foo { :after { content: 'foo'; } }"
    },
    {
      description: "should pass when using ::before without &",
      code: ".foo { ::before { content: 'foo'; } }"
    },
    { 
      description: "should pass when using ::after without &",
      code: ".foo { ::after { content: 'foo'; } }"
    },
    
  ],

  reject: [
    {
      description: "should fail when using & with :before",
      code: ".foo { &:before { content: 'foo'; } }",
      fixed: ".foo { :before { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("never") }
      ],
    },
    {
      description: "should fail when using & with :after",
      code: ".foo { &:after { content: 'foo'; } }",
      fixed: ".foo { :after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("never") }
      ],
    },
    {
      description: "should fail when using & with ::before",
      code: ".foo { &::before { content: 'foo'; } }",
      fixed: ".foo { ::before { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("never") }
      ],
    },
    {
      description: "should fail when using & with ::after",
      code: ".foo { &::after { content: 'foo'; } }",
      fixed: ".foo { ::after { content: 'foo'; } }",
      warnings: [
        { message: messages.rejected("never") }
      ],
    }
  ]
});