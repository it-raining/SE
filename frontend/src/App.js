import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Homepage from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import History from './pages/history/History';
import Print from './pages/print/Print';
import NewQuery from './pages/print/new/new';
import Configure from './pages/print/new/configure';
import Printer from './pages/printer/Printer';
import Pay from './pages/pay/Pay';
import Help from './pages/help/Help';

function App() {
  const [loginStatus , setLoginStatus] = useState(false);
  return (
    <BrowserRouter>
      <div>
        <header className="Banner">
          <img src={require('./assets/headtitle.png')} className="title" alt="" />
          <nav className="menu-bar" style={(window.location.pathname === "/login" || loginStatus) ? { display: 'none' } : {}}>
            <Link to="/login" onClick={() => setLoginStatus(true)}>Đăng nhập</Link> &nbsp;&nbsp;&nbsp;       
            <Link to="/contact">Liên hệ</Link> &nbsp;&nbsp;&nbsp;  
          </nav>
          <div className="avatar" style={(loginStatus) ? {} : { display: 'none' }}>
            <img src={require('./assets/avatar.png')} alt=""/>
          </div>
        </header>
      </div>
      <div>
        <section className="Context">
          <Sidebar/> 
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/homepage" element={<Homepage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/print" element={<Print/>} />
            <Route path="/print/new" element={<NewQuery/>} />
            <Route path="/print/configure" element={<Configure/>} />
            <Route path="/printer" element={<Printer/>} />
            <Route path="/history" element={<History/>} />
            <Route path="/pay" element={<Pay/>} />
            <Route path="/help" element={<Help/>} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
