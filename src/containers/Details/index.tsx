import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, editUser } from "./slice";
import { getUserId, getUser, getIsLoading, getError } from "./selectors";
import { UserItem } from "../Entities/Users/types";
import { useHistory } from "react-router-dom";
import { userListPath } from "../../urls";
import UserForm from "../../components/UserForm";

const UserDetails = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserId);
  const user = useSelector(getUser);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const [isEditing, setEditing] = React.useState(true);
  const history = useHistory();

  React.useEffect(() => {
    if (userId) {
      dispatch(loadUser(userId));
    }
  }, [dispatch, userId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (user === undefined) {
    return <p>User not found</p>;
  }
  const onEdit = (userInfo: UserItem) => {
    dispatch(editUser(userInfo));
    setEditing(false);
    history.push(userListPath);
  };
  const style = {
    margin: "10px",
    padding: "0.5rem",
    border: "1px solid black"
}
  return (
    <div style = {style}>
            <h3>User Details</h3>
            {isEditing && (
                <UserForm  addUser={onEdit}/>
            )}
            {!isEditing && (
                <>
                <p>
                    First name: {user.firstName}
                </p>
                <p>
                    Last name: {user.lastName}
                </p>
                <p>
                    Username: {user.userName}
                </p>
                <p>
                    Language: {user.language}
                </p>
                <p>
                    Creation date: {user.created}
                </p>
    
                <button type="button" onClick={() => setEditing(true)}>
                        Edit
                    </button>
                </>
            )}
            
        </div>
  );
};

export default UserDetails;