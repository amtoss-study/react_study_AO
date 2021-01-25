import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Middleware, AnyAction } from "redux";
import createSagaMiddleware from "redux-saga";
import {
  connectRouter,
  routerMiddleware as createRouterMiddleware,
  RouterState,
} from "connected-react-router";
import { createBrowserHistory } from "history";

import usersReducer, {
  State as UsersState,
} from "./containers/Entities/Users/slice";

import userListReducer, {
  State as UserListState,
} from "./containers/UserList/slice";

import userDetailsReducer, {
  State as UserDetailsState,
} from "./containers/Details/slice";
import saga from "./saga";

export type State = {
  router: RouterState;
  entities: {
    users: UsersState;
  };
  userList: UserListState;
  userDetails: UserDetailsState;
};

export const history = createBrowserHistory();

const routerMiddleware = createRouterMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore<State, AnyAction, Middleware[]>({
  reducer: {
    // @ts-ignore
    router: connectRouter(history),
    entities: combineReducers({
      users: usersReducer,
    }),
    userList: userListReducer,
    userDetails: userDetailsReducer,
  },
  middleware: [routerMiddleware, sagaMiddleware],
});

sagaMiddleware.run(saga);

export default store;