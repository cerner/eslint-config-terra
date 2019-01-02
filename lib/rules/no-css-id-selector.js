module.exports = {
  meta: {
    type: 'suggestion', // "problem" will be.....

    docs: {
      description: 'disallow the use of css id selectors in webdriver commands',
      category: 'Possible Errors',
      recommended: false,
      url: 'https://github.com/cerner/eslint-plugin-terra/docs/rules/no-css-id-selector',
    },

    fixable: 'code',

    messages: {
      message: "Driver commands may not accept css id selectors. Expected '{{ received }}' to be {{ expected }}.",
    },
  },

  create: (context) => {
    /**
     * List of webdriver.io commands that allows browser.command(element, value) or element.command(value).
     */
    const commandsToIgnore = [
      'navigateTo',
      'execute',
      'executeAsync',
      'url',
    ];

    /**
     * List of webdriver.io commands that allows browser.command(element, value) or element.command(value).
     */
    const commandsWithPotentialIssues = [
      'addValue',
      'getCssProperty',
      'getElementAttribute',
      'getElementProperty',
      'getHTML',
      'setValue',
    ];

    /**
     * List of the Terra Service element selector names.
     */
    const terraServiceSelectors = [
      'selector', // Terra.should.matchScreenshot() && Terra.should.themeCombinationOfCustomProperties()
      'context', // Terra.should.beAccessbile()
    ];

    /**
     * List of the Terra Service helpers that accept element selectors.
     */
    const terraServiceHelpers = [
      'beAccessible',
      'matchScreenshot',
      'themeEachCustomProperty',
      'themeCombinationOfCustomProperties',
    ];

    /**
     * Returns whether or not to check the webdriver.io command.
     */
    const shouldVerifyCommand = name => (
      !commandsToIgnore.includes(name)
    );

    /**
     * Returns whether or not the webdriver.io command allows browser.command(element, value) or element.command(value) syntax.
     */
    const isCommandWithPotentialIssues = name => (
      commandsWithPotentialIssues.includes(name)
    );

    /**
     * Replaces css id selector syntax with attribute id selector syntax.
     */
    const createFix = (node, expected) => (
      fixer => fixer.replaceText(node, expected)
    );

    /**
     * Returns the expected attribute id selector syntax for a given element selector.
     * Examples:
     *   #element ---> [id='element']
     *   #element:nth-of-type(1) ---> [id='element']:nth-of-type(1)
     *   #element > svg > #div ---> [id='element'] > svg > [id='div']
     */
    const expectedSyntax = (received) => {
      const selectors = received.split(' ');
      selectors.forEach((selector, index) => {
        if (selector.startsWith('#')) {
          // split on : to maintain syntax like #id:nth-of-type(1)
          const parsed = selector.split(':');
          parsed[0] = `${parsed[0].replace('#', '[id=')}]`;

          selectors[index] = parsed.join(':');
        }
      });
      return `'${selectors.join(' ')}'`;
    };

    /**
     * Reports an error if the command argument contains css id selector syntax.
     */
    const validateSyntax = (node) => {
      const received = node.value;
      if (received && typeof received === 'string' && received.includes('#')) {
        const expected = expectedSyntax(received);
        context.report({
          node,
          messageId: 'message',
          data: { received, expected },
          fix: createFix(node, expected),
        });
      }
    };

    return {
      /**
       * Checks that valid element id selector syntax is used for browser commands.
       */
      "MemberExpression[object.name='browser'][parent.arguments.length > 0]": (node) => {
        const nodeName = node.property.name;

        if (!shouldVerifyCommand(nodeName)) {
          return;
        }

        if (isCommandWithPotentialIssues(nodeName) && node.parent.arguments.length > 1) {
          validateSyntax(node.parent.arguments[0]);
        } else if (!isCommandWithPotentialIssues(nodeName)) {
          node.parent.arguments.find(arg => validateSyntax(arg));
        }
      },

      /**
       * Checks that valid element selector syntax is used for bound commands.
       */
      "MemberExpression[property.name='bind'][parent.arguments.length > 1]": (node) => {
        validateSyntax(node.parent.arguments[1]);
      },

      /**
       * Checks that valid element selector syntax is used for $ element shortcut.
       */
      "CallExpression[callee.name='$'][arguments.length > 0]": (node) => {
        validateSyntax(node.arguments[0]);
      },

      /**
       * Checks that valid element selector syntax is used for $$ element shortcut.
       */
      "CallExpression[callee.name='$$'][arguments.length > 0]": (node) => {
        validateSyntax(node.arguments[0]);
      },

      /**
       * Checks that valid element selector syntax is used for Terra Service helpers.
       */
      "MemberExpression[object.object.name='Terra']": (node) => {
        const nodeName = node.property.name;

        if (!terraServiceHelpers.includes(nodeName)) {
          return;
        }

        node.parent.arguments.forEach((arg) => {
          // Terra.should.themeEachCustomProperty allows themeEachCustomProperty(selector, options) or themeEachCustomProperty(options)
          if (nodeName === 'themeEachCustomProperty' && arg.type === 'Literal') {
            validateSyntax(arg);
          } else if (arg.type === 'ObjectExpression') {
            arg.properties.find((property) => {
              if (property.key && terraServiceSelectors.includes(property.key.name)) {
                return validateSyntax(property.value);
              }
              return null;
            });
          }
        });
      },
    };
  },
};
