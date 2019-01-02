// eslint-disable-next-line import/no-extraneous-dependencies
import { danger, fail } from 'danger';

const modifiedChangelog = danger.git.modified_files.filter((filePath) => {
  const srcFilePattern = /CHANGELOG.md/i;
  return srcFilePattern.test(filePath);
});

const modifiedConfigFiles = danger.git.modified_files.filter((filePath) => {
  const scriptFilePattern = /eslint.config.js/i;
  return scriptFilePattern.test(filePath);
});

const hasCHANGELOGChanges = modifiedChangelog.length > 0;
const hasModifiedConfigFiles = modifiedConfigFiles.length > 0;

// Fail if there are src code changes without a CHANGELOG update
if (hasModifiedConfigFiles && !hasCHANGELOGChanges) {
  fail('Please include a CHANGELOG entry with this PR.');
}
