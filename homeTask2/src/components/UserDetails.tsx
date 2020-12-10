import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserItem } from './types'
import UserForm from './UserForm'

type Props = {
    userHistoryList: UserItem[]
    editUser: (id: number, userInfo: UserItem) => void
}
const UserDetails = ({userHistoryList, editUser}: Props) => {
    const {userId} = useParams<{userId: string}>();
    const [isEditing, setEditing] = useState(false)
    const user = userHistoryList.find(item => item.id.toString() === userId)
    if(user === undefined){
        return <p>User not found</p>
    }
    const { id, firstName } = user
    const onEdit = (id: number, userInfo: UserItem) => {
        editUser(userId, userInfo)
        setEditing(false)
    }

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
    )
}

export default UserDetails