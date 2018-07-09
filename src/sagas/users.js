import { takeEvery , put, call } from 'redux-saga/effects';
import { authorize } from '../ducks/auth';
import { requestFlow } from './request';
import {
  fetchTokenOwnerRequest,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure
} from '../ducks/users';
import {
  getTokenOwner,
  getUserInformation,
  getUserFollowers,
  getUserRepos
} from '../api';
import { getTokenFromLocalStorage } from 'localStorage';

export function* fetchUserWatch() {
  yield takeEvery(authorize, tokenOwnerRequest);
}

function* tokenOwnerRequest() {
  try {
    yield put(fetchTokenOwnerRequest);
    const token = yield call(getTokenFromLocalStorage);
    const result = yield call(requestFlow(getTokenOwner, token));
    yield put(fetchUserSuccess, result);
  } catch (error) {
    yield put(fetchUserFailure, error);
  }
}
