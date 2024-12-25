import React, { useState, useEffect } from 'react';
import "../../App.css";
import "./Pay.css";
import Avatar from "../../assets/avatar.png";
import Thoc from "../../assets/thoc.png";
import Search from "../../assets/search.png";

function Pay() {

    useEffect(() => {
        document.title = 'Thanh toán - SPSO';
    }, []);
    
    const PaymentList = JSON.parse(sessionStorage.getItem('paymentList')).filter((val) => {
        return val.uid === Number(sessionStorage.getItem('uid'));
    })
    const [opt, setOpt] = useState("all")
    const [searchVal, setSearchVal] = useState("")
    function fieldSelect(e) {setOpt(e.target.value)}
    const filteredSearchList = PaymentList.filter((val) => {
        if (!searchVal) return val;
        else {
            return val.title.includes(searchVal) && val;
        }
    });
    const filteredStatusList = filteredSearchList.filter((val) => {
        if (opt === "all") {
            return val.status;
        } else if (opt === "pay") {
            return val.status === "Pay";
        } else if (opt === "deposit") {
            return val.status === "Deposit";
        }
        return val;
    });

    const userID = Number(sessionStorage.getItem('uid'));

    const soDu = Number(sessionStorage.getItem('current')); // Số dư ban đầu
    const [soLuaCanNap, setSoLuaCanNap] = useState(""); // Số lúa cần nạp
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State to control confirmation dialog visibility
    const [pendingNapLua, setPendingNapLua] = useState(0); // Store the pending amount to be added to the balance
    const handleNapLua = () => {
        const soLua = parseInt(soLuaCanNap, 10); // Chuyển chuỗi thành số nguyên
        if (!isNaN(soLua) && soLua >= 5000) {
          setPendingNapLua(soLua); // Store the amount to be confirmed
          setShowConfirmDialog(true); // Show the confirmation dialog
          setSoLuaCanNap(""); // Reset input field
        } else {
          alert("Vui lòng nhập số lúa hợp lệ (tối thiểu 5000 Lúa)!");
        }
    };
    const handleConfirm = () => {

        const date = new Date();
        const pidCount = Number(sessionStorage.getItem('payCount'));

        const newPaymentList = [
            {
                pid: Date.now(),
                uid: userID,
                title: "Nạp " + pidCount,
                time: (((date.getHours() - 1) % 12 + 1) % 24) + ":" + date.getMinutes() + (date.getHours() < 12 ? " AM" : " PM"),
                date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
                amount: pendingNapLua,
                status: "Deposit"
            },
            ...PaymentList
        ]

        sessionStorage.setItem('payCount', Number(pidCount) + 1)
        sessionStorage.setItem('current', soDu + pendingNapLua);
        sessionStorage.setItem('paymentList', JSON.stringify(newPaymentList));
    
        // Đóng dialog và reset trạng thái
        setShowConfirmDialog(false);
        setPendingNapLua(0);
    };
    
    const handleCancel = () => {
        setShowConfirmDialog(false); // Close the dialog without changes
        setPendingNapLua(0); // Reset pending amount
    };

    return(
        <div className="Pay">
            <div className="panel">
                <div className="headname">
                    <label>Tài khoản</label>
                </div>
                <img src={Avatar} id="avatar" alt=""/>
                <div className="info">
                    <div id="username">{sessionStorage.getItem('username')}</div>
                    <div id="uid">UID: {userID}</div>
                    <div className="interest">
                        <label id="text">Số lúa khả dụng:</label><br/>
                        <label id="number">{sessionStorage.getItem('current')}</label>
                        <img src={Thoc} className="currency" alt=""/>
                    </div>
                </div>
                <div className="deposit">
                    <label id="context">Số lúa cần nạp:</label>
                    <input 
                        type="number" 
                        id="soLuaCanNap"
                        value={soLuaCanNap}
                        onChange={(e) => setSoLuaCanNap(e.target.value)}
                        style={{
                            marginLeft: "10px",
                            padding: "5px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            height: "30px"
                        }}
                        placeholder="Nhập số lúa"
                    />
                    <img src={Thoc} className="currency" alt=""/>
                    <label id="note">
                        <br/>
                        *Tối thiểu: 5,000 thóc<br/>
                        *1000 VND = 1000 thóc<br/>
                    </label>
                    <button 
                        type='submit'
                        onClick={handleNapLua}
                    >
                        Nạp</button>
                    </div>
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="ConfirmDialog" style={{
                    position: 'fixed',
                    top: '121px',
                    left: '169px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 121px)',
                    width: 'calc(100vw - 169px)',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}>
                    <div className="ConfirmDialog-content">
                        <h4>Xác nhận nạp lúa</h4>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            <p>Số lúa: <b>{pendingNapLua.toLocaleString()}</b> </p>
                            <img src={Thoc} height="16px" style={{
                                paddingTop: "12px",
                                paddingLeft: "4px",
                            }}
                            alt=""/>
                        </div> 
                        <p>Số tiền cần trả: <b>{pendingNapLua.toLocaleString()} VND</b></p>
                        <div className="ConfirmDialog-buttons">
                            <button onClick={handleConfirm} style={{ backgroundColor: "#4CAF50", color: "white" }}>Xác nhận</button>
                            <button onClick={handleCancel} style={{ backgroundColor: "#f44336", color: "white" }}>Hủy</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="history">
                <div className="filter">
                    <div className="search-bar">
                        <img src={Search} className="search-icon" alt=""/>
                        <input type='search' id="search" onChange={e => setSearchVal(e.target.value)} placeholder="Nhập để tìm kiếm..."/>
                    </div>         
                    <div className="field">
                        <select onChange={fieldSelect}>
                            <option value={"all"}>Tất cả</option>
                            <option value={"pay"}>Thanh toán</option>
                            <option value={"deposit"}>Nạp</option>
                        </select>
                    </div>            
                </div>
                <div className="head">
                    <table>
                        <tr>
                            <th id="title">Tiêu đề</th>
                            <th id="time">Thời gian</th>
                            <th id="date">Ngày</th>
                            <th id="id">Mã</th>
                            <th id="amount">Số thóc</th>
                            <th id="status">Trạng thái</th>
                        </tr>
                    </table>
                </div>        
                <div className="list">                        
                    {filteredStatusList.length > 0 ? (filteredStatusList.map((val) => {
                        return (                         
                            <div className="row">
                                <table>
                                    <tr id={val.status === "Pay" ? "pay" : (val.status === "Deposit" ? "deposit" : "other")}>
                                        <th id="title">{val.title}</th>
                                        <th id="time">{val.time}</th>
                                        <th id="date">{val.date}</th>
                                        <th id="id">{val.pid}</th>
                                        <th id="amount">{val.amount}</th>
                                        <th id="status">{val.status === "Pay" ? "Thanh toán" : (val.status === "Deposit" ? "Nạp" : "Khác")}</th>
                                    </tr> 
                                </table>
                            </div>
                        ); 
                    })) : (
                        <p>Chưa có lịch sử nạp tiền.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Pay;