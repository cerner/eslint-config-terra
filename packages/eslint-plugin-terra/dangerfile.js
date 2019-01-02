// eslint-disable-next-line import/no-extraneous-dependencies
import { danger, fail, warn } from 'danger';

const hasCHANGELOGChanges = danger.git.modified_files.some((filePath) => {
  const srcFilePattern = /CHANGELOG.md/i;
  return srcFilePattern.test(filePath);
});

const hasModifiedRulesFiles = danger.git.modified_files.some((filePath) => {
  const srcFilePattern = /lib\/rules/i;
  return srcFilePattern.test(filePath);
});

const addedRules = danger.git.created_files.filter((filePath) => {
  const srcFilePattern = /lib\/rules/i;
  return srcFilePattern.test(filePath);
});

const hasNewRules = addedRules.length > 0;

// Fail if there are rule additions or changes without a CHANGELOG update
if ((hasModifiedRulesFiles || hasNewRules) && !hasCHANGELOGChanges) {
  fail('Please include a CHANGELOG entry with this PR.');
}

if (hasNewRules) {
  const addedDocs = danger.git.created_files.filter((filePath) => {
    const srcFilePattern = /docs\/rules/;
    return srcFilePattern.test(filePath);
  });

  const hasDocForEachNewRule = addedRules.every((ruleFile) => {
    const ruleName = ruleFile.replace(/lib\/rules\//, '').replace('.js', '');
    return addedDocs.every(docFile => docFile.includes(ruleName));
  });

  const hasREADMEChanges = danger.git.created_files.some((filePath) => {
    const srcFilePattern = /README.md/i;
    return srcFilePattern.test(filePath);
  });

  // Fail if a new rule is added without its corresponding documentent changes
  if (hasNewRules && !hasDocForEachNewRule) {
    fail('Please include the corresponding rule documentation.');
  }

  // Fail if the new rule(s) were not added to the README
  if (hasNewRules && !hasREADMEChanges) {
    fail('Please add the new rule(s) to the rule list in the README.');
  }
}

// Warn when there is a big PR
const bigPRThreshold = 1000;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR. Consider breaking this into smaller PRs if applicaple');
}