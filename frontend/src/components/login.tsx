import axios from 'axios';
import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const BASE_URL = "http://localhost:8080"

    const handleLogin = async () => {
        try {
            const res  = await axios.post(`${BASE_URL}/signup` , {username , password})
            localStorage.setItem("token", res.data.token)
            window.location.href = "/dashboard"

        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="card mt-5" style={{ maxWidth: '400px', margin: 'auto' }}>
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleLogin}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};




export default Login;
