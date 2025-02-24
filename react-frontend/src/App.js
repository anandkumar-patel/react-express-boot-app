import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeServer } from "./mockingserver/mirageserver";

makeServer(); // Start MirageJS only in development mode

const MOCK_BASE_URL = "/api";  // MirageJS mock API
const EXPRESS_BASE_URL = process.env.EXPRESS_BASE_URL;

const API_BASE_URL = "http://localhost:3000";

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${MOCK_BASE_URL}/users`); 
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${MOCK_BASE_URL}/users`, { name, email });
            fetchUsers(); // Refresh user list
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>

            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required /><br></br>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required /><br></br>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default App;
