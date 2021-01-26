import { matchPath } from "react-router-dom";
import { getLocation } from "connected-react-router";
import { createSelector } from "reselect";

import { State } from "../../store";
import { userDetailsPath } from "../../urls";
import { UserItem } from "../Entities/Users/types";
import { getUserById } from "../Entities/Users/selector";

export const getUserId = (state: State): number | undefined => {
  const pathname = getLocation(state).pathname;
  console.log(pathname);
  const match = matchPath<{ id?: string }>(pathname, {
    path: userDetailsPath,
  });
  if (match === null) return undefined;
  const params = match.params;
  if (params.id) return parseInt(params.id, 10);
};

export const getUser: (state: State) => UserItem | undefined = createSelector(
  (state) => state,
  getUserId,
  (state, userId) => {
    if (userId !== undefined) {
      return getUserById(state, userId);
    }
  }
);

export const getIsLoading = (state: State): boolean =>
  state.userDetails.isLoading;

export const getError = (state: State) => state.userDetails.error;