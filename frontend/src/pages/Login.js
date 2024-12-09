import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserList } from '../UserList';
import "../App.css";
import "./Login.css";

function Login() {
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
            <img src={require("../assets/background.png")} className="schoolbg" alt=""/>
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
                        <a href="#">Quên mật khẩu</a>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;