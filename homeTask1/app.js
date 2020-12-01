const UserForm = ({ addUser }) => {
    return (
        <form onSubmit={addUser} autoComplete="off" style={{ margin: "10px" }}>
            <div style={{ margin: "10px" }}>
                <label>First Name
          <input type="text" id="firstName"></input>
                </label>
            </div>
            <div style={{ margin: "10px" }}>
                <label>Last Name
          <input type="text" id="lastName"></input>
                </label>
            </div>
            <div style={{ margin: "10px" }}>
                <label>User Name
          <input type="text" id="userName"></input>
                </label>
            </div>
            <div style={{ margin: "10px" }}>
                <label>Language: <select id="language">
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

const UserTable = ({ usersList, removeUser }) => {
    const tableStyle = {
        border: "1px solid black",
        margin: "10px"
    }
    const thtdStyle = {
        margin: "0",
        padding: "0.5rem",
        border: "1px solid black"
    }

    return (
        <table style={tableStyle}>
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
                            <td style={thtdStyle}>{user.firstName}</td>
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
    );
}

const App = () => {
    const [userHistoryList, setUserHistoryList] = useState(JSON.parse(localStorage.getItem("UserHistory") || "[]"));
    const addUser = (event) => {
        const timestamp = new Date();
        userHistoryList.push({
            id: timestamp,
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            userName: event.target.userName.value,
            language: event.target.language.value,
            created: timestamp.toLocaleString()
        });

        setUserHistoryList(userHistoryList);
        localStorage.setItem("UserHistory", JSON.stringify(userHistoryList));
    };

    const removeUser = (id) => {
        const test = userHistoryList.filter((item) => item.id !== id); //почему через объявление отдельной переменной фильтр работает и сохраняет в стэйт
        setUserHistoryList(test);
        localStorage.setItem("UserHistory", JSON.stringify(test));
        //setUserHistoryList(userHistoryList.filter((item) => item.id !== id)); // так не работает если удалить 1 элемент и обновить. Если удалить 2 подряд элемента, то удаляется 1, а второй остается
        //localStorage.setItem("UserHistory", JSON.stringify(userHistoryList));
    }
    return (
        <div>
            <UserForm addUser={addUser} />
            <UserTable usersList={userHistoryList} removeUser={removeUser} />
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById("root"));