import React, { useState } from 'react';
<<<<<<< Updated upstream:frontend/src/pages/login/Login.js
import "../../App.css";
=======
import "../App.css";
>>>>>>> Stashed changes:frontend/src/pages/Login.js
import "./Login.css";
import BackGround from "../../assets/background.png";

function Login() {
<<<<<<< Updated upstream:frontend/src/pages/login/Login.js
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        if (email === "miyabi@hcmut.edu.vn" && password === "0") 
        {
            var access = true;
            window.location.href = "/homepage";
            return <div>{access}</div>;
        } else {
            console.log("Wrong email / password.");
        }
      };
    return(
        <div className="SignUp">
            <img src={BackGround} className="schoolbg" alt=""/>
            <form className="login-window" onSubmit={handleSubmit}>
                <div className="login-context">
                    <h2 id="login">Đăng nhập</h2>
                    <div className="email">
                        <div className="label">
                            <label>Email address</label>
                        </div>
                        <input type="email" className="form-control" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="password">
                        <div className="label">
                            <label>Password</label>
                        </div>
                        <input type="password" className="form-control" value={password} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="form-submit"><button type="submit" id="submit">Confirm</button></div>
                    
                    <p className="forgot-password">
                        <a href="#forgot">Quên mật khẩu</a>
                    </p>
                </div>
            </form>
=======
  const [username, setUsername] = useState(''); // Username instead of email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send username instead of email
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed");
      }

      const { user } = await response.json();
      console.log("Login successful:", user);
      window.location.href = "/homepage"; // Redirect to homepage
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Login">
      <img src={require("../assets/background.png")} className="schoolbg" alt="" />
      <form className="login-window" onSubmit={handleSubmit}>
        <div className="login-context">
          <h2 id="login">Đăng nhập</h2>
          {error && <p className="error-message">{error}</p>}
          <div className="username">
            <div className="label">
              <label>Username (Email)</label>
            </div>
            <input
              type="text" id="username"
              className="form-control"
              value={username}
              placeholder="Enter username (email)"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <div className="label">
              <label>Password</label>
            </div>
            <input
              type="password" id="password"
              className="form-control"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-submit">
            <button type="submit" id="submit">Confirm</button>
          </div>
          <p className="forgot-password">
            <a href="#">Quên mật khẩu</a>
          </p>
>>>>>>> Stashed changes:frontend/src/pages/Login.js
        </div>
      </form>
    </div>
  );
}

export default Login;
