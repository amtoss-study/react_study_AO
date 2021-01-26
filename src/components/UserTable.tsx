import React, { useEffect } from 'react'
import { UserItem } from './types'
import { Link } from 'react-router-dom'


type Props = {
    usersList: UserItem[]
    removeUser: (id: number) => void
    loadHistory: () => void
    isLoading: boolean
    error?: string
}

const UserTable = ({usersList, removeUser, loadHistory, isLoading, error}: Props) => {
    useEffect(() => {
        loadHistory();
    }, [loadHistory] );
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
         {isLoading && <p>Loading...</p>}
         {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick= {loadHistory}>Reload</button>      
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
                    <td style={thtdStyle}><Link to={`/users/${user.id}`}>{user.firstName}</Link></td>
                    
                    <td style={thtdStyle}>{user.lastName}</td>
                    <td style={thtdStyle}>{user.userName}</td>
                    <td style={thtdStyle}>{user.language}</td>
                    <td style={thtdStyle}>{user.created}</td>
                    <td style={thtdStyle}>
                        <button type="button" onClick={() => removeUser(user.id)}>
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
}
export default UserTable