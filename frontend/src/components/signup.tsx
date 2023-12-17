import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = () => {
  };

  return (
    <div className="card mt-5" style={{ maxWidth: '400px', margin: 'auto' }}>
      <div className="card-body">
        <h2 className="card-title">Signup</h2>
        <form>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
          <button type="button" className="btn btn-success" onClick={handleSignup}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};



export default Signup;
