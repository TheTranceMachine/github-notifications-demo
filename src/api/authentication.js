const GitHubClient = require('./GitHubClient.js').GitHubClient;

const githubToken = localStorage.getItem("github_token");

export const githubClient = new GitHubClient(githubToken);
