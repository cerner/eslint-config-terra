<!-- Logo -->
<p align="center">
  <img height="128" width="128" src="https://github.com/cerner/eslint-plugin-terra/raw/master/terra.png">
</p>

<!-- Name -->
<h1 align="center">
  Terra's Eslint Plugin
</h1>

[![NPM version](https://badgen.net/npm/v/eslint-plugin-terra)](https://www.npmjs.org/package/eslint-plugin-terra)
[![License](https://badgen.net/github/license/cerner/eslint-plugin-terra)](https://github.com/cerner/eslint-plugin-terra/blob/master/LICENSE)
[![Build Status](https://badgen.net/travis/cerner/eslint-plugin-terra)](https://travis-ci.org/cerner/eslint-plugin-terra)
[![Dependencies status](https://badgen.net/david/dep/cerner/eslint-plugin-terra)](https://david-dm.org/cerner/eslint-plugin-terra)
[![devDependencies status](https://badgen.net/david/dev/cerner/eslint-plugin-terra)](https://david-dm.org/cerner/eslint-plugin-terra?type=dev)


Custom ESLint rules for the [Terra UI library](https://engineering.cerner.com/terra-ui/).

## Installation

Install the module

```shell
$ npm install eslint --save-dev
$ npm install eslint-plugin-terra --save-dev
```

## Usage
First, include the plugin in your eslint configuration by adding `terra` to the plugin list. Then, you can define the terra-plugin rules by listing `terra/rule-to-configure` under the rules key.


### eslint.config.js
```js
module.exports = {
  plugins: [
    'terra',
  ],
  rules: {
    'terra/no-css-id-selector': 'error',
  },
};

```

## Rule Documentation
- [no-css-id-selector](docs/no-css-id-selector.md) - disallow the use of css id selectors in webdriver commands

## Versioning

eslint-plugin-terra is considered to be stable and will follow [SemVer](http://semver.org/) for versioning.
1. MAJOR versions represent breaking changes
2. MINOR versions represent added functionality in a backwards-compatible manner
3. PATCH versions represent backwards-compatible bug fixes

Consult the component CHANGELOGs, related issues, and PRs for more information.

## Contributing

Please read through our [contributing guidelines](CONTRIBUTING.md). Included are directions for issue reporting and pull requests.

## LICENSE

Copyright 2018 Cerner Innovation, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

&nbsp;&nbsp;&nbsp;&nbsp;http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
