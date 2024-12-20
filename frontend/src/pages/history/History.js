import React, { useState } from 'react';
import "../../App.css";
import "./History.css";
import { PrintingList } from "./PrintingList";
import { PrintedList } from "./PrintedList";

function History() {
    const [status, setStatus] = useState('printing');

    return(
        <div className="History">
            <div className="tab-list">
                <button id="printing" onClick={() => setStatus('printing')}>
                    <p>Đang in</p>
                    <box className="notif" id="1">0</box>
                </button>
                <button id="printed" onClick={() => setStatus('printed')}>   
                    <p>Đã in</p>   
                    <box className="notif" id="2">0</box>              
                </button>
            </div>
            <div className="list">
                {(status === "printing" && (PrintingList.map((val) => {
                    return (
                        <div className="row" id="printing">
                            <img src={val.image} id="picture" alt=""/>
                            <div className="info">
                                <p className="title">{val.title}</p>
                                <progress value={val.progress}/>
                                <p style={{display: "inline", marginLeft:"50px"}}>{val.progress}%</p>
                            </div>
                        </div>
                    );
                }))) ||
                (status === "printed" && (PrintedList.map((val) => {
                    return (
                        <div className="row" id="printed">
                            <img src={val.image} id="picture" alt=""/>
                            <div className="info">
                                <p className="title">{val.title}</p>
                            </div>
                        </div>
                    );
                })))} 
            </div>
        </div>
    );
}

export default History;