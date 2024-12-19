import React, { useState } from 'react';
import "../../App.css";
import "./Login.css";
import BackGround from "../../assets/background.png";
import { UserList } from "../../UserList";

function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const UserAccount = UserList.find((val) => {
          return val.username === username;
        });
        if (!UserAccount) {
          alert("Username not available.");
        } else {
          if (UserAccount.password === password) {
            window.location.href = "/homepage";
            return true;
          } else {
            alert("Wrong password.");
          }
        }
      };
    return(
        <div className="Login">
      <img src={BackGround} className="schoolbg" alt="" />
      <form className="login-window" onSubmit={handleSubmit}>
        <div className="login-context">
          <h2 id="login">Đăng nhập</h2>
          <div className="username">
            <div className="label">
              <label>Username (Email)</label>
            </div>
            <input
              type="text" id="email"
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
        </div>
      </form>
    </div>
    );
}

export default Login;