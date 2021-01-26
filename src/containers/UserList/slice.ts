import {
    createSlice,
    createAction,
    CaseReducer,
    PayloadAction,
  } from "@reduxjs/toolkit";
  import { UserItem } from "../Entities/Users/types";
  
  export type State = {
    usersIds: number[];
    isLoading: boolean;
    error: string | undefined;
  };
  
  type Reducers = {
    loadUsersAttempt: CaseReducer<State>;
    loadUsersSuccess: CaseReducer<State, PayloadAction<number[]>>;
    loadUsersError: CaseReducer<State, PayloadAction<string>>;
    addUsersSuccess: CaseReducer<State, PayloadAction<number>>;
    removeUserSuccess: CaseReducer<State, PayloadAction<number>>;
    resetUsers: CaseReducer<State>;
  };
  
  const initialState: State = {
    usersIds: [],
    isLoading: false,
    error: undefined,
  };
  
  export const LOAD_USERS = "UserList/LOAD_USERS";
  export const loadUsers = createAction(LOAD_USERS);
  
  export const ADD_USER = "UserList/ADD_USER";
  export const addUser = createAction(ADD_USER, (userInfo: UserItem) => ({
    payload: userInfo,
  }));
  export type AddUserAction = ReturnType<typeof addUser>;
  
  export const REMOVE_USER = "UserList/REMOVE_USER";
  export const removeUser = createAction(REMOVE_USER, (userId: number) => ({
    payload: userId,
  }));
  export type RemoveUserAction = ReturnType<typeof removeUser>;
  
  const userListSlice = createSlice<State, Reducers>({
    name: "userList",
    initialState,
    reducers: {
      loadUsersAttempt: (state) => {
        state.isLoading = true;
        state.error = undefined;
      },
      loadUsersSuccess: (state, action) => {
        state.usersIds = action.payload;
        state.isLoading = false;
        state.error = undefined;
      },
      loadUsersError: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
      addUsersSuccess: (state, action) => {
        state.usersIds.push(action.payload);
        state.isLoading = false;
        state.error = undefined;
      },
      removeUserSuccess: (state, action) => {
        state.usersIds = state.usersIds.filter(
          (userId) => userId !== action.payload
        );
      },
      resetUsers: () => initialState,
    },
  });
  
  export const {
    loadUsersAttempt,
    loadUsersSuccess,
    loadUsersError,
    addUsersSuccess,
    removeUserSuccess,
    resetUsers,
  } = userListSlice.actions;
  
  export default userListSlice.reducer;