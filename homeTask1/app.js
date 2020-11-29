const App = () => {
    const [userHistoryList, setUserList] = React.useState(
        JSON.parse(localStorage.getItem("UserHistory") || "[]")
    );
    const addNewUser = (newUser) => {
        setUserHistoryList([...userHistoryList, newUser]);
    };
    const removeUser = (key) => {
        setUserHistoryList(
            userHistoryList.filter((item) => item.key !== key)
        );
    };
    const setUserHistoryList = (userHistoryList) => {
        setUserList(userHistoryList);
        localStorage.setItem("UserHistory", JSON.stringify(userHistoryList));
    };

    return (
        <React.Fragment>
            <SubmitForm addNewUser={addNewUser} />
            <UserHistory userHistoryList={userHistoryList} removeUser={removeUser} />
        </React.Fragment>
    );
};

const SubmitForm = ({ addNewUser }) => {
    const margin = {
        margin: "10px",
    };
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [progLanguage, setProgLanguage] = React.useState("C#");

    const handleSubmit = (event) => {
        event.preventDefault()
        const timestamp = new Date();
        addNewUser({
            key: timestamp.getTime(),
            created: timestamp.toLocaleString(),
            firstName: firstName,
            lastName: lastName,
            username: username,
            progLanguage: progLanguage,
        });
        clear();
    };

    const clear = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setProgLanguage("C#")
    };

    const handleChange = (event) => {
        if (event.target.name === "firstName")
            setFirstName(event.target.value);

        if (event.target.name === "lastName")
            setLastName(event.target.value);

        if (event.target.name === "username")
            setUsername(event.target.value);

        if (event.target.name === "progLanguage")
            setProgLanguage(event.target.value);
    };

    return (
        <form style={margin} onSubmit={handleSubmit} autoComplete="off">
            <h3>Create a new User</h3>
            <div style={margin}>
                <label>First Name: <input name="firstName" type="text"
                    value={firstName} onChange={handleChange} /></label>
            </div>
            <div style={margin}>
                <label>Last Name: <input name="lastName" type="text"
                    value={lastName} onChange={handleChange} /></label>
            </div>
            <div style={margin}>
                <label>Username: <input name="username" type="text"
                    value={username} onChange={handleChange} /></label>
            </div>
            <div style={margin}>
                <label> Programming Language: <select name="progLanguage" value={progLanguage} onChange={handleChange}>
                    <option value="C#">C#</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="Python">Python</option>
                    <option value="Ruby">Ruby</option>
                </select>
                </label>
            </div>
            <button style={margin} type="submit">Create</button>
        </form>
    );
};

const UserHistory = ({ userHistoryList, removeUser }) => {
    const tableStyle = {
        border: "1px solid black",
        margin: "10px"
    }
    const thtdStyle = {
        margin: "0",
        padding: "0.5rem",
        border: "1px solid black"
    }
    const handleRemove = (event) => {
        removeUser(Number(event.target.name));
    };

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
                {userHistoryList.map((userHistory) => {
                    return (
                        <tr key={userHistory.key}>
                            <td style={thtdStyle}>{userHistory.firstName}</td>
                            <td style={thtdStyle}>{userHistory.lastName}</td>
                            <td style={thtdStyle}>{userHistory.username}</td>
                            <td style={thtdStyle}>{userHistory.progLanguage}</td>
                            <td style={thtdStyle}>{userHistory.created}</td>
                            <td style={thtdStyle}>
                                <button type="button" onClick={handleRemove} style={{ width: "100%" }} name={userHistory.key}>
                                    Remove
                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));