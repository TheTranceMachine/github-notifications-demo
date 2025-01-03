import { put, takeEvery, select } from 'redux-saga/effects';
// import moment from 'moment';
import {
  GET_NOTIFICATIONS,
  GET_MORE_NOTIFICATIONS,
  SET_NOTIFICATION_AS_READ,
  SET_NOTIFICATION_SUBSCRIPTION
} from '../actionTypes/notifications';
import { githubClient } from '../api/authentication';
import {
  getNotificationsSuccess,
  getNotificationsError,
  getMoreNotificationsSuccess,
  setNotificationAsReadSuccess
} from '../actions/notifications';
import { notify } from "../utils/electronNotifications";

export const getSince = (state) => state.notifications.since;
export const getRepositories = (state) => state.repositories.repositories;

export function* getNotificationsSaga(showAllRead) {
  try {
    const repositories = yield select(getRepositories);
    const { data } = yield githubClient.getNotifications({ repositories });
    yield put(getNotificationsSuccess(data));
  } catch (e) {
    yield put(getNotificationsError(e));
  }
}

export function* getMoreNotificationsSaga(showAllRead) {
  try {
    const repositories = yield select(getRepositories);
    const { data } = yield githubClient.getNotifications({ repositories });
    if (data.length) notify(data);
    yield put(getMoreNotificationsSuccess(data));
  } catch (e) {
    yield put(getNotificationsError(e));
  }
}

export function* setNotificationAsReadSaga({ id }) {
  yield put(setNotificationAsReadSuccess(id));
}

export function* setNotificationSubscriptionSaga(subscription) {
  try {
    const { id, ignored } = subscription;
    yield put(setSubscriptionSuccess({ id, ignored }));
  } catch (e) {
    yield put(setSubscriptionError(e));
  }
}

export const fetchNotificationsSaga = takeEvery(GET_NOTIFICATIONS, getNotificationsSaga);
export const fetchMoreNotificationsSaga = takeEvery(GET_MORE_NOTIFICATIONS, getMoreNotificationsSaga);
export const updateNotificationAsReadSaga = takeEvery(SET_NOTIFICATION_AS_READ, setNotificationAsReadSaga);
export const updateNotificationSubscription = takeEvery(SET_NOTIFICATION_SUBSCRIPTION, setNotificationSubscriptionSaga);