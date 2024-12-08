import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import History from './pages/History';
import Print from './pages/Print';
import Printer from './pages/Printer';
import Pay from './pages/Pay';
import Help from './pages/Help';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header className="Banner">
          <img src={require('./assets/headtitle.png')} className="title" alt="" />
          <nav className="menu-bar">
            <Link to="/login">Login</Link> &nbsp;&nbsp;&nbsp;       
            <Link to="/contact">Contact</Link> &nbsp;&nbsp;&nbsp;  
          </nav>
        </header>
      </div>
      <div>
        <section className="Context">
          <Sidebar/> 
          <Routes>
            <Route path="" element={<Homepage/>} />
            <Route path="homepage" element={<Homepage/>} />
            <Route path="print" element={<Print/>} />
            <Route path="print/new" element={<Print/>} />
            <Route path="printer" element={<Printer/>} />
            <Route path="history" element={<History/>} />
            <Route path="pay" element={<Pay/>} />
            <Route path="help" element={<Help/>} />
            <Route path="*" element={<Homepage/>} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
