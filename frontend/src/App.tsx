import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/dashboard';
import { useEffect, useState } from 'react';


function App() {
  const [auth , setAuth] = useState(false)

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    console.log(auth)
    if (token) {
      setAuth(true)
      // If the token is set and not already on the dashboard, navigate to the dashboard route
      if (window.location.pathname !== '/dashboard') {
        window.location.href = '/dashboard';
       
      }
    }
    else {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
  }, [token]);

  return (
    <Router>
      <div className="container mt-3">
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              InterviewTracker
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              {  
                !auth ? <ul className="navbar-nav">
                <li className="nav-item">
                {}
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </ul> : 
              <ul>
              </ul>  
              }
              
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
