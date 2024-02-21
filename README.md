# @jantimon/stylelint-enforce-pseudo-ampersand

[![npm version](https://badge.fury.io/js/%40jantimon%2Fstylelint-enforce-pseudo-ampersand.svg)](https://npmjs.org/package/@jantimon/stylelint-enforce-pseudo-ampersand)

A stylelint plugin that enforces the use of ampersands (`&`) in front of pseudo selectors in CSS. This plugin helps maintain consistency and readability in your stylesheet's pseudo-element and pseudo-class selectors by ensuring they are nested within their parent selectors using the ampersand syntax.

## Installation

First, you need to install [stylelint](https://stylelint.io/):

```bash
npm install stylelint --save-dev
```

Then add `@jantimon/stylelint-enforce-pseudo-ampersand`:

```bash
npm install @jantimon/stylelint-enforce-pseudo-ampersand --save-dev
```

## Usage

After installing, add the plugin to your `.stylelintrc` config. Under the `plugins` section, include `@jantimon/stylelint-enforce-pseudo-ampersand`, and then add the rule under `rules`.

```json
{
  "plugins": [
    "@jantimon/stylelint-enforce-pseudo-ampersand"
  ],
  "rules": {
    "jantimon/stylelint-enforce-pseudo-ampersand": "always" // or "never"
  }
}
```

### Options

- `"always"` (default): Ensures you must use `&` in front of pseudo selectors.
- `"never"`: Ensures you must not use `&` in front of pseudo selectors.

### Examples

#### `"always"`

The following patterns are considered violations:

```css
.foo ::before {
  content: 'foo';
}
```

The following patterns are *not* considered violations:

```css
.foo &::before {
  content: 'foo';
}
```

#### `"never"`

The following patterns are considered violations:

```css
.foo &::before {
  content: 'foo';
}
```

The following patterns are *not* considered violations:

```css
.foo ::before {
  content: 'foo';
}
```

## Contributing

Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/jantimon/stylelint-enforce-pseudo-ampersand/blob/main/LICENSE) file for details.
