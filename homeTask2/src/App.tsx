const App = () => {     
  const { userHistoryList, addUser, editUser, removeUser } = useUsers()
  
  
  return(
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/details/:userId">
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