import * as types from '../actionTypes/repositories';

export const getRepositories = () => ({
  type: types.GET_REPOSITORIES
});

export const getRepositoriesSuccess = (repositories) => ({
  type: types.GET_REPOSITORIES_SUCCESS,
  repositories
});

export const getRepositoriesError = (error) => ({
  type: types.GET_REPOSITORIES_ERROR,
  error
});