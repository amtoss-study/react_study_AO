import React, { useState } from 'react'
import { UserItem } from './types'
type Props = {
    addUser: (userInfo: UserItem) => void
}

const UserForm = ({ addUser}: Props) => {
  let newUser: UserItem = {
    id: 0,
    firstName: "",
    lastName: "",
    userName: "",
    language: "C#",
    created: ""
  }

  const [userInfo, setUserInfo] = useState(newUser);
  const onChange = (event: any) => setUserInfo({ ...userInfo, [event.target.name]: event.target.value });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    addUser(userInfo);
  }
  
    return (
      <form onSubmit={onSubmit} autoComplete="off" style = {{margin: "10px"}}>
        <div style = {{margin: "10px"}}>
          <label>First Name
            <input type="text" name="firstName" value = {userInfo.firstName} onChange={onChange}></input>
          </label>
        </div>
        <div style = {{margin: "10px"}}>
          <label>Last Name
            <input type="text" name="lastName" value = {userInfo.lastName} onChange={onChange}></input>
          </label>
        </div>
        <div style = {{margin: "10px"}}>
          <label>User Name
            <input type="text" name="userName" value = {userInfo.userName} onChange={onChange}></input>
          </label>
        </div>
        <div style = {{margin: "10px"}} >
          <label >Language: <select name="language" value = {userInfo.language} onChange={onChange}>
                        <option value="C#">C#</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="Python">Python</option>
                        <option value="Ruby">Ruby</option>
                    </select>
          </label>
        </div> 
        <button type="submit" name="createUser">Create</button>
      </form>
    )
}

export default UserForm
  