# disallow the use of css id selectors in webdriver commands (no-css-id-selector-syntax)

The `--fix` option on the command line can automatically fix the problems reported by this rule.


## Rule Details

This rule is aimed at catching the use of css id selectors in webdriver commands. Some of the newer (v3.14+) Selenium drivers have made changes to align with the W3C protocols instead of the JsonWireProtocol and they do not allow the use of css id selector. When a css id selector is used, it can crash the test without a meaningful error message.

Examples of **incorrect** code for this rule:

```js
/*eslint no-css-id-selector-syntax: "error"*/

browser.click('#test');

browser.addValue('#test > input', '123');

Terra.should.matchScreenshot({ selector: '#test:first-child' });

```

Examples of **correct** code for this rule:

```js
/*eslint no-css-id-selector-syntax: "error"*/

browser.click('[id=test]');

browser.addValue('[id=test] > input', '123');

Terra.should.matchScreenshot({ selector: '[id=test]:first-child' });
```

## Futher Reading
- https://www.seleniumhq.org/docs/03_webdriver.jsp#locating-ui-elements-webelements
- https://webdriver.io/docs/selectors.html
- https://www.w3.org/TR/CSS/#selectors