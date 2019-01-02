ChangeLog
=========

Unreleased
-----------------

2.2.0 - (January 2, 2019)
-----------------
### Added
* Rule override to turn off the `no-unused-expression` rule for jest or wdio test files.

### Changed
* Added after as globals for test files recursively under a "wdio" directory
* Tempararily lock-down `eslint-plugin-react`. V7.12.0 was released with bugs and has not yet been fixed. Locking this down until a fix is released.

2.1.0 - (August 29, 2018)
------------------
### Changed
* Updated mount, shallow, and render to only be globals for test files recursively under a "jest" directory
* Added before, browser, and Terra as globals for test files recursively under a "wdio" directory

2.0.0 - (August 23, 2018)
------------------
### Changed
* Update ESLint and related dependencies to ESLint v5 compatible versions
* Disabled the deprecated `jsx-a11y/label-has-for rule`. More info about this rule deprecation here: https://github.com/evcohen/eslint-plugin-jsx-a11y/releases/tag/v6.1.0
* Replaced `jsx-a11y/label-has-for` rule with new `jsx-a11y/label-has-associated-control` rule
* Disabled `react/destructuring-assignment` rule

1.1.0 - (July 11, 2018)
------------------
### Changed
* Updated 'jsx-a11y/label-has-for' to require id or nested input for label mapping

1.0.1 - (June 19, 2018)
------------------
### Changed
* Minor update to ReadMe

1.0.0 - (June 18, 2018)
------------------
* Initial stable release
* Updated to ensure travis builds successfully
