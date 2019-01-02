const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-css-id-selector');

const ruleTester = new RuleTester();

ruleTester.run('no-css-id-selector for browser commands', rule, {
  valid: [
    'browser.click("[id=test]");',
    'browser.click(".test");',
    'browser.click("div");',
    'browser.click("[id=test] > div");',
    'browser.click("svg > [id=test]");',
    'browser.click("[id=test]:first-child");',

    // verifying browser commands to ignore
    'browser.url("#/raw/tests/test-item");',
    'browser.execute(document.querySelector("input[name=`terra-time-minute-input`]").style.caretColor = "transparent");',
    'browser.executeAsync(document.querySelector("input[name=`terra-time-minute-input`]").style.caretColor = "transparent");',

    // verifying browser commands with potential issues
    'element.addValue("#12");',
    'browser.addValue(".test", "#12");',
    'element.setValue("#12");',
    'element.setValue(".test", "#12");',
  ],
  invalid: [
    {
      code: 'browser.click("#test");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'browser.click("#test > div");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: 'browser.click("#test > div > svg");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > svg' to be '[id=test] > div > svg'." },
      ],
    },
    {
      code: 'browser.click("#test > #firstDiv > svg");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > svg' to be '[id=test] > [id=firstDiv] > svg'." },
      ],
    },
    {
      code: 'browser.click("#test > div > #firstSVG");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > #firstSVG' to be '[id=test] > div > [id=firstSVG]'." },
      ],
    },
    {
      code: 'browser.click("#test > #firstDiv > #firstSVG");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > #firstSVG' to be '[id=test] > [id=firstDiv] > [id=firstSVG]'." },
      ],
    },
    {
      code: 'browser.click("#test:firstChild");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test:firstChild' to be '[id=test]:firstChild'." },
      ],
    },
    // verifying browser commands with potential issues
    {
      code: 'browser.setValue("#test", "#12");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'browser.setValue("#test", "#12");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for $ element shortcut', rule, {
  valid: [
    '$("[id=test]");',
    '$(".test");',
    '$("div");',
    '$("[id=test] > div");',
    '$("svg > [id=test]");',
    '$("[id=test]:first-child");',
  ],
  invalid: [
    {
      code: '$("#test");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: '$("#test > div");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: '$("#test > div > svg");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > svg' to be '[id=test] > div > svg'." },
      ],
    },
    {
      code: '$("#test > #firstDiv > svg");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > svg' to be '[id=test] > [id=firstDiv] > svg'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for $$ element shortcut', rule, {
  valid: [
    '$$("[id=test]");',
    '$$(".test");',
    '$$("div");',
    '$$("[id=test] > div");',
    '$$("svg > [id=test]");',
    '$$("[id=test]:first-child");',
  ],
  invalid: [
    {
      code: '$$("#test");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: '$$("#test > div");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: '$$("#test > div > svg");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > svg' to be '[id=test] > div > svg'." },
      ],
    },
    {
      code: '$$("#test > #firstDiv > svg");',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > svg' to be '[id=test] > [id=firstDiv] > svg'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for bounded browser commands', rule, {
  valid: [
    'browser.click.bind(browser, "[class*=button]")',
    'browser.setValue.bind(browser, "input", "Lorem")',
    'browser.setValue.bind(browser, "input", "#12")',
  ],
  invalid: [
    {
      code: 'browser.click.bind(browser, "#test")',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'browser.setValue.bind(browser, "#test", "Lorem")',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'browser.setValue.bind(browser, "#test", "#12")',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for Terra.should.beAccessible', rule, {
  valid: [
    'Terra.should.beAccessible();',

    // verifying Terra.should.beAccessible(axeOptions)
    'Terra.should.beAccessible({ context: ".test" })',
    'Terra.should.beAccessible({ context: "div" })',
    'Terra.should.beAccessible({ context: "[id=test] > div" })',
    'Terra.should.beAccessible({ context: "svg > [id=test]" })',
    'Terra.should.beAccessible({ context: "[id=test]:first-child" })',
    'Terra.should.beAccessible({ context: ".test", viewports: [] })',
    'Terra.should.beAccessible({ viewports: [] })',
  ],
  invalid: [
    {
      code: 'Terra.should.beAccessible({ context: "#test" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'Terra.should.beAccessible({ context: "#test > div" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: 'Terra.should.beAccessible({ context: "#test > div > svg" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > svg' to be '[id=test] > div > svg'." },
      ],
    },
    {
      code: 'Terra.should.beAccessible({ context: "#test > #firstDiv > svg" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > svg' to be '[id=test] > [id=firstDiv] > svg'." },
      ],
    },
    {
      code: 'Terra.should.beAccessible({ context: "#test > div > #firstSVG" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > #firstSVG' to be '[id=test] > div > [id=firstSVG]'." },
      ],
    },
    {
      code: 'Terra.should.beAccessible({ context: "#test > #firstDiv > #firstSVG" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > #firstSVG' to be '[id=test] > [id=firstDiv] > [id=firstSVG]'." },
      ],
    },
    {
      code: 'Terra.should.beAccessible({ context: "#test:firstChild" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test:firstChild' to be '[id=test]:firstChild'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for Terra.should.matchScreenshot', rule, {
  valid: [
    'Terra.should.matchScreenshot();',

    // verifying Terra.should.matchScreenshot(screenshotOptions)
    'Terra.should.matchScreenshot({ viewports: [] })',
    'Terra.should.matchScreenshot({ selector: ".test" })',
    'Terra.should.matchScreenshot({ selector: "div" })',
    'Terra.should.matchScreenshot({ selector: "[id=test]" })',
    'Terra.should.matchScreenshot({ selector: "[id=test] > div" })',
    'Terra.should.matchScreenshot({ selector: "svg > [id=test]" })',
    'Terra.should.matchScreenshot({ selector: "[id=test]:first-child" })',
    'Terra.should.matchScreenshot({ selector: ".test", viewports: [] })',

    // verifying Terra.should.matchScreenshot(screenshotName)
    'Terra.should.matchScreenshot("on click")',

    // verifying Terra.should.matchScreenshot(screenshotName, screenshotOptions)
    'Terra.should.matchScreenshot("on click", { selector: ".test" })',
    'Terra.should.matchScreenshot("on click", { selector: "div" })',
    'Terra.should.matchScreenshot("on click", { selector: "[id=test] > div" })',
    'Terra.should.matchScreenshot("on click", { selector: "svg > [id=test]" })',
    'Terra.should.matchScreenshot("on click", { selector: "[id=test]:first-child" })',
  ],
  invalid: [
    // verifying Terra.should.matchScreenshot(screenshotOptions)
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test > div" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test > div > svg" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > svg' to be '[id=test] > div > svg'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test > #firstDiv > svg" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > svg' to be '[id=test] > [id=firstDiv] > svg'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test > div > #firstSVG" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > #firstSVG' to be '[id=test] > div > [id=firstSVG]'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test > #firstDiv > #firstSVG" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > #firstSVG' to be '[id=test] > [id=firstDiv] > [id=firstSVG]'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot({ selector: "#test:firstChild" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test:firstChild' to be '[id=test]:firstChild'." },
      ],
    },
    // verifying Terra.should.matchScreenshot(screenshotName, screenshotOptions)
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test > div" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test > div > svg" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > svg' to be '[id=test] > div > svg'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test > #firstDiv > svg" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > svg' to be '[id=test] > [id=firstDiv] > svg'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test > div > #firstSVG" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div > #firstSVG' to be '[id=test] > div > [id=firstSVG]'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test > #firstDiv > #firstSVG" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > #firstSVG' to be '[id=test] > [id=firstDiv] > [id=firstSVG]'." },
      ],
    },
    {
      code: 'Terra.should.matchScreenshot("on click", { selector: "#test:firstChild" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test:firstChild' to be '[id=test]:firstChild'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for Terra.should.themeEachCustomProperty', rule, {
  valid: [
    // verifying Terra.should.themeEachCustomProperty(themeProperties);
    'Terra.should.themeEachCustomProperty({ "--color": "red", "--font-size": "20px" })',

    // verifying Terra.should.themeEachCustomProperty(selector, themeProperties);
    'Terra.should.themeEachCustomProperty(".test", { "--color": "red", "--font-size": "20px" })',
    'Terra.should.themeEachCustomProperty("div", { "--color": "red", "--font-size": "20px" })',
    'Terra.should.themeEachCustomProperty("[id=test]", { "--color": "red", "--font-size": "20px" })',
    'Terra.should.themeEachCustomProperty("[id=test] > div",{ "--color": "red", "--font-size": "20px" })',
    'Terra.should.themeEachCustomProperty("svg > [id=test]", { "--color": "red", "--font-size": "20px" })',
  ],
  invalid: [
    {
      code: 'Terra.should.themeEachCustomProperty("#test", { "--color": "red", "--font-size": "20px" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'Terra.should.themeEachCustomProperty("#test > div", { "--color": "red", "--font-size": "20px" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: 'Terra.should.themeEachCustomProperty("#test > #firstDiv > #firstSVG", { "--color": "red", "--font-size": "20px" });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > #firstSVG' to be '[id=test] > [id=firstDiv] > [id=firstSVG]'." },
      ],
    },
  ],
});

ruleTester.run('no-css-id-selector for Terra.should.themeCombinationOfCustomProperties', rule, {
  valid: [
    // verifying Terra.should.themeCombinationOfCustomProperties(themeOptions);
    'Terra.should.themeCombinationOfCustomProperties({ testName: "test", properties: { "--color": "red", "--font-size": "20px" } })',
    'Terra.should.themeCombinationOfCustomProperties({ selector: ".test", testName: "test", properties: { "--color": "red", "--font-size": "20px" } })',
    'Terra.should.themeCombinationOfCustomProperties({ selector: "div", testName: "test", properties: { "--color": "red", "--font-size": "20px" } })',
    'Terra.should.themeCombinationOfCustomProperties({ selector: "[id=test] > div", testName: "test", properties: { "--color": "red", "--font-size": "20px" } })',
    'Terra.should.themeCombinationOfCustomProperties({ selector: ".test", testName: "test", properties: { "--color": "red", "--font-size": "20px" } })',
  ],
  invalid: [
    {
      code: 'Terra.should.themeCombinationOfCustomProperties({ selector: "#test", testName: "test", properties: { "--color": "red", "--font-size": "20px" } });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test' to be '[id=test]'." },
      ],
    },
    {
      code: 'Terra.should.themeCombinationOfCustomProperties({ selector: "#test > div", testName: "test", properties: { "--color": "red", "--font-size": "20px" } });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > div' to be '[id=test] > div'." },
      ],
    },
    {
      code: 'Terra.should.themeCombinationOfCustomProperties({ selector: "#test > #firstDiv > #firstSVG", testName: "test", properties: { "--color": "red", "--font-size": "20px" } });',
      errors: [
        { message: "Driver commands may not accept css id selectors. Expected '#test > #firstDiv > #firstSVG' to be '[id=test] > [id=firstDiv] > [id=firstSVG]'." },
      ],
    },
  ],
});
