import { GetRepositoriesOptions } from "@/app/types";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const fetchRepositories = async (options: GetRepositoriesOptions) => {
  return await octokit.rest.repos.listForAuthenticatedUser(options);
};
