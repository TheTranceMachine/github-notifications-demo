import { Repository } from '@/app/types';
import { v4 as uuidv4 } from 'uuid';

const types = ['Issue', 'PullRequest', 'Release', 'Commit'];
const reasons = ['subscribed', 'review_requested', 'mention', 'author'];
const randomIssues = [
  {
    "id": uuidv4(),
    "title": "update README.md",
  },
  {
    "id": uuidv4(),
    "title": "fix typo in CONTRIBUTING.md",
  },
  {
    "id": uuidv4(),
    "title": "add new feature",
  },
  {
    "id": uuidv4(),
    "title": "remove unused files",
  },
  {
    "id": uuidv4(),
    "title": "update dependencies",
  },
  {
    "id": uuidv4(),
    "title": "add new test",
  },
  {
    "id": uuidv4(),
    "title": "add new feature",
  },
  {
    "id": uuidv4(),
    "title": "fix bug",
  },
  {
    "id": uuidv4(),
    "title": "remove unused code",
  },
  {
    "id": uuidv4(),
    "title": "update dependencies",
  },
];

const randomIssue = randomIssues[Math.floor(Math.random() * randomIssues.length)];
const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
const randomType = types[Math.floor(Math.random() * types.length)];

const threadUID = uuidv4();

const fakeData = (repository: Repository) =>
({
  "id": uuidv4(),
  "repository": {
    "id": uuidv4(),
    "node_id": uuidv4(),
    "name": repository.name,
    "full_name": repository.full_name,
    "owner": {
      "login": "TheTranceMachine",
      "id": 1,
      "node_id": uuidv4(),
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/TheTranceMachine",
      "html_url": "https://github.com/TheTranceMachine",
      "followers_url": "https://api.github.com/users/TheTranceMachine/followers",
      "following_url": "https://api.github.com/users/TheTranceMachine/following{/other_user}",
      "gists_url": "https://api.github.com/users/TheTranceMachine/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/TheTranceMachine/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/TheTranceMachine/subscriptions",
      "organizations_url": "https://api.github.com/users/TheTranceMachine/orgs",
      "repos_url": "https://api.github.com/users/TheTranceMachine/repos",
      "events_url": "https://api.github.com/users/TheTranceMachine/events{/privacy}",
      "received_events_url": "https://api.github.com/users/TheTranceMachine/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": `https://github.com/TheTranceMachine/${repository.name}`,
    "description": repository.description,
    "fork": false,
    "url": `https://api.github.com/repos/${repository.full_name}`,
    "archive_url": `https://api.github.com/repos/${repository.full_name}/{archive_format}{/ref}`,
    "assignees_url": `https://api.github.com/repos/${repository.full_name}/assignees{/user}`,
    "blobs_url": `https://api.github.com/repos/${repository.full_name}/git/blobs{/sha}`,
    "branches_url": `https://api.github.com/repos/${repository.full_name}/branches{/branch}`,
    "collaborators_url": `https://api.github.com/repos/${repository.full_name}/collaborators{/collaborator}`,
    "comments_url": `https://api.github.com/repos/${repository.full_name}/comments{/number}`,
    "commits_url": `https://api.github.com/repos/${repository.full_name}/commits{/sha}`,
    "compare_url": `https://api.github.com/repos/${repository.full_name}/compare/{base}...{head}`,
    "contents_url": `https://api.github.com/repos/${repository.full_name}/contents/{+path}`,
    "contributors_url": `https://api.github.com/repos/${repository.full_name}/contributors`,
    "deployments_url": `https://api.github.com/repos/${repository.full_name}/deployments`,
    "downloads_url": `https://api.github.com/repos/${repository.full_name}/downloads`,
    "events_url": `https://api.github.com/repos/${repository.full_name}/events`,
    "forks_url": `https://api.github.com/repos/${repository.full_name}/forks`,
    "git_commits_url": `https://api.github.com/repos/${repository.full_name}/git/commits{/sha}`,
    "git_refs_url": `https://api.github.com/repos/${repository.full_name}/git/refs{/sha}`,
    "git_tags_url": `https://api.github.com/repos/${repository.full_name}/git/tags{/sha}`,
    "git_url": `git:github.com/${repository.full_name}.git`,
    "issue_comment_url": `https://api.github.com/repos/${repository.full_name}/issues/comments{/number}`,
    "issue_events_url": `https://api.github.com/repos/${repository.full_name}/issues/events{/number}`,
    "issues_url": `https://api.github.com/repos/${repository.full_name}/issues{/number}`,
    "keys_url": `https://api.github.com/repos/${repository.full_name}/keys{/key_id}`,
    "labels_url": `https://api.github.com/repos/${repository.full_name}/labels{/name}`,
    "languages_url": `https://api.github.com/repos/${repository.full_name}/languages`,
    "merges_url": `https://api.github.com/repos/${repository.full_name}/merges`,
    "milestones_url": `https://api.github.com/repos/${repository.full_name}/milestones{/number}`,
    "notifications_url": `https://api.github.com/repos/${repository.full_name}/notifications{?since,all,participating}`,
    "pulls_url": `https://api.github.com/repos/${repository.full_name}/pulls{/number}`,
    "releases_url": `https://api.github.com/repos/${repository.full_name}/releases{/id}`,
    "ssh_url": `git@github.com:${repository.full_name}.git`,
    "stargazers_url": `https://api.github.com/repos/${repository.full_name}/stargazers`,
    "statuses_url": `https://api.github.com/repos/${repository.full_name}/statuses/{sha}`,
    "subscribers_url": `https://api.github.com/repos/${repository.full_name}/subscribers`,
    "subscription_url": `https://api.github.com/repos/${repository.full_name}/subscription`,
    "tags_url": `https://api.github.com/repos/${repository.full_name}/tags`,
    "teams_url": `https://api.github.com/repos/${repository.full_name}/teams`,
    "trees_url": `https://api.github.com/repos/${repository.full_name}/git/trees{/sha}`,
    "hooks_url": `http://api.github.com/repos/${repository.full_name}/hooks`
  },
  "subject": {
    "title": randomIssue.title,
    "url": `https://api.github.com/repos/octokit/octokit.rb/issues/${randomIssue.id}`,
    "latest_comment_url": `https://api.github.com/repos/octokit/octokit.rb/issues/comments/${randomIssue.id}`,
    "type": randomType
  },
  "subscribed": Math.random() >= 0.5,
  "ignored": Math.random() >= 0.5,
  "reason": randomReason,
  "unread": Math.random() >= 0.5,
  "updated_at": new Date().toISOString(),
  "last_read_at": new Date().toISOString(),
  "url": `https://api.github.com/notifications/threads/${threadUID}`,
  "subscription_url": `https://api.github.com/notifications/threads/${threadUID}/subscription`
});

export default fakeData;