import { all } from 'redux-saga/effects';
import {
  fetchNotificationsSaga,
  fetchMoreNotificationsSaga,
  updateNotificationAsReadSaga
} from './notifications';
import { fetchRepositoriesSaga } from './repositories';

export default function* rootSaga() {
  yield all([
    fetchNotificationsSaga,
    fetchMoreNotificationsSaga,
    updateNotificationAsReadSaga,
    fetchRepositoriesSaga
  ]);
}