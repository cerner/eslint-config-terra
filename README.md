<!-- Logo -->
<p align="center">
  <img height="128" width="128" src="https://github.com/cerner/eslint-config-terra/raw/master/terra.png">
</p>

<!-- Name -->
<h1 align="center">
  Terra Eslint Config
</h1>

[![NPM version](http://img.shields.io/npm/v/terra-toolkit.svg)](https://www.npmjs.org/package/eslint-config-terra)

Terra's sharable ESLint configuration for their UI library and build tools.

## What is Eslist?

[ESlint](https://eslint.org/) is a pluggable linting utility for JavaScript and JSX. It extends the  [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which exports ESLint rules, including rules for ECMAScript 6+ and React. Additionally, `eslint-config-terra` utilizes the [eslint-plugin-compat](https://github.com/amilajack/eslint-plugin-compat) plugin to check if the syntax used is supported by the browsers being targeted. It is recommended to use Terra's targeted browsers which are specified by the [browserslist-config-terra](https://github.com/cerner/browserslist-config-terra) module.


## Installation

Install the module

```shell
$ npm install eslint-config-terra --save-dev
$ npm install browserslist-config-terra --save-dev
```


## Usage
The configuration provided can be extended/overriding. Read more about it [here](https://stylelint.io/user-guide/configuration/#extends).

Then, to define the browsers for the `eslint-plugin-compat` plugin, add the browserslist configuration in your package.json. Read more about it [here](https://github.com/amilajack/eslint-plugin-compat#targeting-browsers). 

### package.json
```json
{
  "browserslist": [
    "extends browserslist-config-terra"
  ],
  "eslintConfig": {
    "extends": "terra"
  },
}
```

## Versioning

eslint-config-terra is considered to be stable and will follow [SemVer](http://semver.org/) for versioning.
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
