import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Homepage from './pages/homepage/Homepage';
import History from './pages/history/History';
import Print from './pages/print/Print';
import NewQuery from './pages/print/new/new';
import Configure from './pages/print/new/configure';
// import Upload from './pages/print/new/upload';
import Printer from './pages/printer/Printer';
import Pay from './pages/pay/Pay';
import Help from './pages/help/Help';
import Test from './test';

import "./Login.css";
import BackGround from "./assets/background.png";
import { UserList } from "./UserList";

import Avatar from "./assets/avatar.png";
import Thoc from "./assets/thoc.png";
import InfoDarkBlue from "./assets/infodarkblue.png";
import SettingDarkBlue from "./assets/settingdarkblue.png";
import SupportDarkBlue from "./assets/supportdarkblue.png";
import ExitRed from "./assets/exitred.png";

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
              sessionStorage.setItem('username', UserAccount.username);
              sessionStorage.setItem('login', true);
            window.location.href = "/";
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
            <a href="#forgot">Quên mật khẩu</a>
          </p>
        </div>
      </form>
    </div>
    );
}

function App() {
  const [loginAccess, setLoginAccess] = useState(false);
  const [showUserPanel, setShowUserPanel] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <header className="Banner">
          <img src={require('./assets/headtitle.png')} className="title" alt="" />
          <nav className="menu-bar" style={(window.location.pathname === "/login" || sessionStorage.getItem('login')) ? { display: 'none' } : {}}>
            <Link to="/login" onClick={() => setLoginAccess(!loginAccess)}>Đăng nhập</Link> &nbsp;&nbsp;&nbsp;       
            <Link to="/contact">Liên hệ</Link> &nbsp;&nbsp;&nbsp;  
          </nav>
          <div>
            <img 
              src={Avatar}
              className="avatar"
              onClick={() => setShowUserPanel(!showUserPanel)}
              alt=""
              style={(sessionStorage.getItem('login')) ? {} : { display: 'none' }}
            />
          </div>
        </header>
      </div>
      {showUserPanel && (
          <div className="UserPanel">
            <p id="username">{sessionStorage.getItem('username')}<t style={{color:"#aeaeae", fontWeight:"300", fontSize:"16px"}}>&nbsp;#2210000</t></p>
            <p id="email">email@hcmut.edu.vn</p>
            <p id="current">
              Số dư: <t style={{color:"black", fontWeight:"600", paddingLeft:"16px"}}>123,456</t> 
              <img src={Thoc} height='20px' style={{marginLeft:"8px", marginRight:"4px"}} alt=""/>
              <Link to="/pay" id="plus" onClick={() => setShowUserPanel(false)} style={{
                color:"orange", 
                fontSize:"24px", 
                fontWeight:"690"
                }}>+</Link>
            </p>
            <hr width="250px" color="#aeaeae" style={{position:"fixed", top:"240px", right:"80px"}}></hr>
            <div className="options">
              <Link to="/info" className="option" onClick={() => setShowUserPanel(false)} id="info">
                <img src={InfoDarkBlue} className="panel-icon" alt=""/>
                <p>Tài khoản</p>
              </Link>
              <Link to="/setting" className="option" onClick={() => setShowUserPanel(false)} id="setting">
                <img src={SettingDarkBlue} className="panel-icon" alt=""/>
                <p>Tùy chỉnh</p>
              </Link>
              <Link to="/support" className="option" onClick={() => setShowUserPanel(false)} id="support">
                <img src={SupportDarkBlue} className="panel-icon" alt=""/>
                <p>Hỗ trợ</p>
              </Link>
              <Link to="/" className="option" onClick={() => {setShowUserPanel(false); sessionStorage.removeItem('login')}} id="exit">
                <img src={ExitRed} className="panel-icon" alt=""/>
                <p>Đăng xuất</p>
              </Link>
            </div>
          </div>
      )}
      <div>
        <section className="Context">
          <Sidebar/> 
          {(!sessionStorage.getItem("login") && (
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/homepage" element={<Homepage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/test" element={<Test/>} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          ))
          ||
          (sessionStorage.getItem("login") && (
            <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/homepage" element={<Homepage/>} />
              <Route path="/print" element={<Print/>} />
              <Route path="/print/new" element={<NewQuery/>} />
              <Route path="/printer" element={<Printer/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/pay" element={<Pay/>} />
              <Route path="/help" element={<Help/>} />
              <Route path="/test" element={<Test/>} />
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          ))}
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
