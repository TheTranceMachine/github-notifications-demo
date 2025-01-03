import { put, takeEvery, select } from 'redux-saga/effects';
import { githubClient } from '../api/authentication';
import { GET_REPOSITORIES } from '../actionTypes/repositories';
import { getRepositoriesSuccess, getRepositoriesError } from '../actions/repositories';

export function* getRepositoriesSaga() {
  try {
    const { data } = yield githubClient.getRepositories({ visibility: 'public' });
    yield put(getRepositoriesSuccess(data));
  } catch (e) {
    yield put(getRepositoriesError(e));
  }
}

export const fetchRepositoriesSaga = takeEvery(GET_REPOSITORIES, getRepositoriesSaga);