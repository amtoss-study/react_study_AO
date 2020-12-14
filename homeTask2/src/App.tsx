import React, { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import UserDetails from './components/UserDetails';
import useUsers from './hooks/useUsers'

const App = () => {     
  const { userHistoryList, addUser, editUser, removeUser } = useUsers()  
  
  return(
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/users/:userId">
            <UserDetails userHistoryList={userHistoryList} editUser={editUser}/>
        </Route>
        <Route  path="/">
          <UserForm addUser={addUser}/>
          <UserTable usersList={userHistoryList} removeUser={removeUser}/>
        </Route>
      </Switch>
    </BrowserRouter>    
  )
}
export default App;