import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getIsLoading, getError } from "./selector";
import { loadUsers, removeUser, addUser} from "./slice";
import "./index.css";
import { useHistory } from "react-router-dom";
import { getUserDetailsLink } from "../../urls";
import UserForm from "../../components/UserForm";
import { UserItem } from "../Entities/Users/types";

const UserList = () => {
  const dispatch = useDispatch();
  const usersList = useSelector(getUsers);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const dispatchLoadUsers = React.useCallback(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  React.useEffect(() => {
    dispatchLoadUsers();
  }, [dispatchLoadUsers]);

  const history = useHistory();

  const divStyle = {
    margin: "10px"
}
    const thtdStyle = {
        margin: "0",
        padding: "0.5rem",
        border: "1px solid black"
    }
  return (
    <div style={divStyle}>
      <UserForm
        addUser ={(userItem: UserItem) => {
          dispatch(addUser(userItem));
        }}
      />
        
    {isLoading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}
    <table>
        <caption>Users history</caption>
        <thead>
            <tr>
                <th style={thtdStyle}>First Name</th>
                <th style={thtdStyle}>Last Name</th>
                <th style={thtdStyle}>Username</th>
                <th style={thtdStyle}>Programming Language</th>
                <th style={thtdStyle}>Created</th>
                <th style={thtdStyle}>Remove</th>
            </tr>
        </thead>
        <tbody>
        {usersList.map((user) => {
          return (
            <tr key={user.id}>                
                <td style={thtdStyle}>{user.lastName}</td>
                <td style={thtdStyle}>{user.userName}</td>
                <td style={thtdStyle}>{user.language}</td>
                <td style={thtdStyle}>{user.created}</td>
                <td style={thtdStyle}>
                    <button type="button" onClick={() => dispatch(removeUser(user.id))}>
                        Remove
                </button>
                </td>
            </tr>
        );
        })}
        </tbody>
    </table>
    </div>
  );
};

export default UserList;