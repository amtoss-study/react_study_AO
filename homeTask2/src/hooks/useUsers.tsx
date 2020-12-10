import { useState } from "react";
import { UserItem } from "../components/types";

const useUsers = () => {
    const [userHistoryList, setUserHistoryList] = useState(JSON.parse(localStorage.getItem("UserHistory") || "[]"));
    const addUser = (event: any, userInfo: UserItem) => {
        event.preventDefault();
        const timestamp = Date.now();
        const user = Object.assign({}, userInfo);
        user.id = timestamp;
        user.created = timestamp.toLocaleString();
        const newUsers = [...userHistoryList, user];
        setUserHistoryList(newUsers);
        localStorage.setItem("UserHistory", JSON.stringify(newUsers));
    };

    const editUser = (id: number, userInfo: UserItem) => {
        const newUserHistory = userHistoryList.map(item => {
            if (item.id.toString() === id) {
                item.firstName = userInfo.firstName;
                item.lastName = userInfo.lastName;
                item.userName = userInfo.userName;
                item.language = userInfo.language;
                return item
            }
            return item
        })
        return setUserHistoryList(newUserHistory)
    }

    const removeUser = (id: number) => {
        const test = userHistoryList.filter((item: UserItem) => item.id !== id);
        setUserHistoryList(test);
        localStorage.setItem("UserHistory", JSON.stringify(test));
    }

    return { userHistoryList, addUser, editUser, removeUser }
}

export default useUsers