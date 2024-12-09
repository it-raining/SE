import React from 'react';
import "../App.css";
import "./Homepage.css";

function Homepage() {
    return(
        <div className="Homepage">
            <img src={require("../assets/background.png")} className="schoolfield" alt=""/>
            <nav>
                <p id="home">Thông báo chung</p>      
                <p id="home">Điều khoản sử dụng</p> 
            </nav>
            <p id="leftfixed">
                Tổ kỹ thuật SPSO<br/>
                Email : lmao@hcmut.edu.vn<br/>
                SĐT (Tel.) : (84-8) 12345678-4269
            </p>
            <p id="rightfixed">© Copyright 2024 SSPS</p>
        </div>
    );
}

export default Homepage;