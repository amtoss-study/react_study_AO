import { State } from "../../store";
import { getUsersByIds } from "../Entities/Users/selector";
import { UserItem } from "../Entities/Users/types";

export const getUsersIds = (state: State): number[] => state.userList.usersIds;

export const getUsers = (state: State): UserItem[] =>
  getUsersByIds(state, getUsersIds(state));

export const getIsLoading = (state: State): boolean => state.userList.isLoading;

export const getError = (state: State) => state.userList.error;