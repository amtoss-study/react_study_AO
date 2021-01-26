import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

import { UserItem } from "./types";

export type State = Record<number, UserItem>;

type Reducers = {
  addUsers: CaseReducer<State, PayloadAction<UserItem[]>>;
};

export const usersSlice = createSlice<State, Reducers>({
  name: "users",
  initialState: {},
  reducers: {
    addUsers: (state, action) => {
      action.payload.forEach((user) => {
        state[user.id] = user;
      });
    },
  },
});

export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;