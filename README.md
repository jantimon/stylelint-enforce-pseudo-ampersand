# stylelint-enforce-pseudo-ampersand
Disallow empty selector in a css rule

```css
                    a, ,.b { display: inline; width: 100px; }
/**                   ↑
 *       This empty selector */
```

## Installation

```
npm install stylelint-enforce-pseudo-ampersand --save-dev
```

## Usage

```js
// .stylelintrc
{
  "plugins": [
    "stylelint-enforce-pseudo-ampersand"
  ],
  "rules": {
    "plugin/stylelint-enforce-pseudo-ampersand": true,
  }
}
```
## Options

### `true`

The following patterns are considered violations:
```css
a,,span { display: inline; width: 100px; }
```
```css
a,span, { display: inline; width: 100px; }
```
