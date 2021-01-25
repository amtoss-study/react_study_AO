import {
    createSlice,
    createAction,
    CaseReducer,
    PayloadAction,
  } from "@reduxjs/toolkit";
import { UserItem } from "../Entities/Users/types";
  
  export type State = {
    isLoading: boolean;
    error: string | undefined;
  };
  
  type Reducers = {
    loadUsersAttempt: CaseReducer<State>;
    loadUsersSuccess: CaseReducer<State>;
    loadUsersError: CaseReducer<State, PayloadAction<string>>;
  };
  
  const initialState: State = {
    isLoading: false,
    error: undefined,
  };
  
  export const LOAD_DETAILS = "UsersDetails/LOAD_DETAILS";
  export const loadUser = createAction(LOAD_DETAILS, (id: number) => ({
    payload: id,
  }));
  export type LoadUserAction = ReturnType<typeof loadUser>;
  
  export const EDIT_USER = "UsersDetails/EDIT_USER";
  export const editUser = createAction(
    EDIT_USER,
    (userItem: UserItem) => ({
      payload: userItem,
    })
  );
  export type EditUserAction = ReturnType<typeof editUser>;
  
  const userDetailsSlice = createSlice<State, Reducers>({
    name: "usersList",
    initialState,
    reducers: {
      loadUsersAttempt: (state) => {
        state.isLoading = true;
        state.error = undefined;
      },
      loadUsersSuccess: (state) => {
        state.isLoading = false;
        state.error = undefined;
      },
      loadUsersError: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      },
    },
  });
  
  export const {
    loadUsersAttempt: loadUserAttempt,
    loadUsersSuccess: loadUserSuccess,
    loadUsersError: loadUserError,
  } = userDetailsSlice.actions;
  
  export default userDetailsSlice.reducer;