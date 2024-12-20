import React, {useState} from 'react';
import "../../App.css";
import "./Pay.css";
import Avatar from "../../assets/avatar.png";
import Thoc from "../../assets/thoc.png";
import Search from "../../assets/search.png";
import { PaymentList } from './PaymentList';

function Pay() {
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
        } else {
            return ;
        }
    });
    const [soDu, setSoDu] = useState(0); // Số dư ban đầu
    const [soLuaCanNap, setSoLuaCanNap] = useState(""); // Số lúa cần nạp
    const [showConfirmDialog, setShowConfirmDialog] = useState(false); // State to control confirmation dialog visibility
    const [pendingNapLua, setPendingNapLua] = useState(0); // Store the pending amount to be added to the balance
    const [history, setHistory] = useState([]); // Lưu trữ lịch sử nạp tiền
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
        // Thêm số lúa vào số dư
        setSoDu(soDu + pendingNapLua); 
    
        // Cập nhật lịch sử nạp tiền
        const newHistory = [
          ...history,
          {
            id: history.length + 1,
            description: "Nạp lúa",
            time: new Date().toLocaleString(),
            amount: pendingNapLua,
          },
        ];
        setHistory(newHistory);
    
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
                    <div id="username">skibidi</div>
                    <div id="uid">UID: 2210000</div>
                    <div className="interest">
                        <label id="text">Số thóc khả dụng:</label><br/>
                        <label id="number">{soDu.toLocaleString()}</label>
                        <img src={Thoc} className="currency" alt=""/>
                    </div>
                </div>
                <div className="deposit">
                    <label id="context">Số thóc cần nạp:</label>
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
                        *Tối thiểu: 5,000 thóc<br/>
                        *1000 VND = 1000 thóc<br/>
                    </label>
                    <button 
                        type='submit'
                        onClick={handleNapLua}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Nạp</button>
                    </div>
            </div>

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="ConfirmDialog">
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
                                        <th id="id">{val.id}</th>
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