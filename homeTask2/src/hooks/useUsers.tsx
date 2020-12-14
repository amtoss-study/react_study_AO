import { useState } from "react";
import { UserItem } from "../components/types";

const useUsers = () => {
    const [userHistoryList, setUserHistoryList] = useState(JSON.parse(localStorage.getItem("UserHistory") || "[]"));
    const addUser = (userInfo: UserItem) => {
        const timestamp = Date.now();
        userInfo.id = timestamp;
        userInfo.created = timestamp.toLocaleString();
        const newUsers = [...userHistoryList, userInfo];
        setUserHistoryList(newUsers);
        localStorage.setItem("UserHistory", JSON.stringify(newUsers));
    };

    const editUser = (userInfo: UserItem) => {
        const newUserHistory = userHistoryList.map(item => {
            if (item.id === userInfo.id) {
                return { ...item, ...userInfo }
            }
            return item;
        })
        return setUserHistoryList(newUserHistory);
    }

    const removeUser = (id: number) => {
        const test = userHistoryList.filter((item: UserItem) => item.id !== id);
        setUserHistoryList(test);
        localStorage.setItem("UserHistory", JSON.stringify(test));
    }

    return { userHistoryList, addUser, editUser, removeUser }
}

export default useUsers