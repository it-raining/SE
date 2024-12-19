import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Homepage from './pages/homepage/Homepage';
import History from './pages/history/History';
import Print from './pages/print/Print';
import NewQuery from './pages/print/new/new';
import Printer from './pages/printer/Printer';
import Pay from './pages/pay/Pay';
import Help from './pages/help/Help';

import "./Login.css";
import BackGround from "./assets/background.png";
import { UserList } from "./UserList";

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
              sessionStorage.setItem('login', true);
            window.location.href = "/homepage";
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

function App() {
  const [loginStatus , setLoginStatus] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <header className="Banner">
          <img src={require('./assets/headtitle.png')} className="title" alt="" />
          <nav className="menu-bar" style={(window.location.pathname === "/login" || sessionStorage.getItem('login')) ? { display: 'none' } : {}}>
            <Link to="/login" onClick={() => setLoginStatus(true)}>Đăng nhập</Link> &nbsp;&nbsp;&nbsp;       
            <Link to="/contact">Liên hệ</Link> &nbsp;&nbsp;&nbsp;  
          </nav>
          <div className="avatar" style={(sessionStorage.getItem('login')) ? {} : { display: 'none' }}>
            <img src={require('./assets/avatar.png')} alt=""/>
          </div>
        </header>
      </div>
      <div>
        <section className="Context">
          <Sidebar/> 
          <Routes>
            
          </Routes>
          {(!sessionStorage.getItem("login") && (
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/homepage" element={<Homepage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/*" element={<Homepage/>} />
            </Routes>
          ))
          ||
          (sessionStorage.getItem("login") && (
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/homepage" element={<Homepage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/print" element={<Print/>} />
              <Route path="/print/new" element={<NewQuery/>} />
              <Route path="/printer" element={<Printer/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/pay" element={<Pay/>} />
              <Route path="/help" element={<Help/>} />
              <Route path="/*" element={<Homepage/>} />
            </Routes>
          ))}
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
