// eslint-disable-next-line import/no-extraneous-dependencies
import { danger, warn } from 'danger';

// Warn when there is a big PR
const bigPRThreshold = 1000;
if (danger.github.pr.additions + danger.github.pr.deletions > bigPRThreshold) {
  warn(':exclamation: Big PR. Consider breaking this into smaller PRs if applicaple');
}
