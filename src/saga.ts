import {
    call,
    put,
    select,
    takeLatest,
    takeEvery,
    all,
  } from "redux-saga/effects";
  
import api from "./api";
import {
  loadUsersAttempt,
  loadUsersSuccess,
  loadUsersError,
  addUsersSuccess,
  removeUserSuccess,
  resetUsers,
  LOAD_USERS,
  ADD_USER,
  AddUserAction,
  REMOVE_USER,
  RemoveUserAction,
} from "./containers/UserList/slice";

import {
  loadUserAttempt,
  loadUserSuccess,
  loadUserError,
  LOAD_DETAILS,
  LoadUserAction,
  EDIT_USER,
  EditUserAction,
} from "./containers/Details/slice";
import { addUsers } from "./containers/Entities/Users/slice";
import { UserItem } from "./containers/Entities/Users/types";
import { getUserById } from "./containers/Entities/Users/selector";
import { getUsersIds } from "./containers/UserList/selector";
  
  function* fetchUsers() {
    yield put(resetUsers());
    yield put(loadUsersAttempt());
    try {
      const data: UserItem[] = yield call(api.get, "users");
      yield put(addUsers(data));
      yield put(loadUsersSuccess(data.map((user) => user.id)));
    } catch (error) {
      put(loadUsersError(error));
    }
  }
  
  function* fetchUser(action: LoadUserAction) {
    const userId = action.payload;
    const state = yield select();
    const user = getUserById(state, userId);
    if (user !== undefined) {
      // don't fetch visit if it is already in store
      return;
    }
    yield put(loadUserAttempt());
    try {
      const data: UserItem = yield call(api.get, `users/${userId}`);
      yield put(addUsers([data]));
      yield put(loadUserSuccess());
    } catch (error) {
      yield put(loadUserError(error));
    }
  }
  
  function* addUser(action: AddUserAction) {
    yield put(loadUsersAttempt());
    try {
      const data = yield call(api.post, "users", action.payload);
      yield put(addUsers([data]));
      yield put(addUsersSuccess(data.id));
    } catch (error) {
      yield put(loadUsersError(error));
    }
  }
  
  function* editUser(action: EditUserAction) {
    const user = action.payload;
    yield put(loadUserAttempt());
    try {
      const data: UserItem = yield call(api.patch, `users/${user.id}`, user);
      yield put(addUsers([data]));
      yield put(loadUserSuccess());
    } catch (error) {
      yield put(loadUserError(error));
    }
  }
  
  function* removeUser(action: RemoveUserAction) {
    const state = yield select();
    const usersIds = getUsersIds(state);
    const removedUserId = action.payload;
    yield put(removeUserSuccess(removedUserId));
    try {
      yield call(api.del, `users/${removedUserId}`);
    } catch (error) {
      yield put(loadUsersError(error));
      yield put(loadUsersSuccess(usersIds));
    }
  }
  
  export default function* saga() {
    yield all([
      takeLatest(LOAD_USERS, fetchUsers),
      takeEvery(REMOVE_USER, removeUser),
      takeEvery(ADD_USER, addUser),
      takeLatest(LOAD_DETAILS, fetchUser),
      takeEvery(EDIT_USER, editUser),
    ]);
  }