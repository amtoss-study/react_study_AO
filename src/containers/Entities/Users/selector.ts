import { State } from "../../../store";
import { UserItem } from "./types";

export const getUserById = (state: State, id: number): UserItem | undefined =>
  state.entities.users[id];

export const getUsersByIds = (state: State, ids: number[]): UserItem[] =>
  ids
    .map((id) => state.entities.users[id])
    .filter((user) => user !== undefined);