import { useCallback, useState } from "react";
import { del, get, patch, post } from "../api";
import { UserItem } from "../components/types";

const useUsers = () => {    
    const [userHistoryList, setUserHistoryList] = useState<UserItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState <string | undefined>(undefined);

    const loadHistory = useCallback(async () => {
      setIsLoading(true);
      setError(undefined);
      try{
        const data = await get("users")
        setUserHistoryList(data)
      }catch(error){
        setError(error)
      }finally{
        setIsLoading(false)
      }     
    }, []);

    const addUser = async (userInfo: UserItem) => {   
      setIsLoading(true);
      setError(undefined);
      try{
        const timestamp = Date.now();
        userInfo.created = timestamp.toLocaleString();
        const data = await post("users", userInfo);
        const newUsers = [...userHistoryList, data];
        setUserHistoryList(newUsers); 
      }catch(error){
        setError(error)
      }finally{
        setIsLoading(false)
      }  
    };

    const editUser = async (userInfo: UserItem) => {
      setIsLoading(true);
      const users = await get("users")
      try{
        const data = await patch(`users/${userInfo.id}`, userInfo);
        const newUserHistory = userHistoryList.map(item => 
          item.id === userInfo.id ? data : item
        );
        setUserHistoryList(newUserHistory);
      }catch(error){
        setError(error)
      }finally{
        setIsLoading(false)
      }  
    }

    const removeUser = (id?: number) => {
      const newUserHistory = userHistoryList.filter((item: UserItem) => item.id !== id);
      setUserHistoryList(newUserHistory);
      try{
        del(`users/${id}`)
      }catch(error){
        setError(error);
        setUserHistoryList(userHistoryList);
      }         
    };
    
    return { userHistoryList, isLoading, loadHistory, addUser, editUser, removeUser };
}

export default useUsers