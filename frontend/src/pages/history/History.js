import React, { useState } from 'react';
import "../../App.css";
import "./History.css";
import DocumentDetail from "../../components/DocumentDetail";
import { PrintingList } from "./PrintingList";
import { PrintedList } from "./PrintedList";

function History() {
    const [status, setStatus] = useState('printing');
    const [detailOn, setDetailOn] = useState(false);
    const fileList = JSON.parse(sessionStorage.getItem('file'));
        const detail = [JSON.parse(sessionStorage.getItem('detail'))];
        const [index, setIndex] = useState(0);
        const fileHandleUp = () => {
            const length = fileList.length;
            setIndex((length + index - 1) % length);
        }
    
        const fileHandleDown = () => {
            const length = fileList.length;
            setIndex((index + 1) % length);
        }
    
    const handleDetail = () => {
        setDetailOn(!detailOn);
    }

    return(
        <div className="History">
            
            {!detailOn && (
            <div className="tab-list">
                <button id="printing" onClick={() => setStatus('printing')}>
                    <p>Đang in</p>
                    <box className="notif" id="1">0</box>
                </button>
                <button id="printed" onClick={() => setStatus('printed')}>   
                    <p>Đã in</p>   
                    <box className="notif" id="2">0</box>              
                </button>
            </div>)}
            {detailOn && (
                    <DocumentDetail
                        fileType="img"
                        filePath={JSON.parse(sessionStorage.getItem('preview'))}
                        fileName={fileList[index].name}
                        fileCount={fileList.length}
                        printer={sessionStorage.getItem('printer')}
                        actionUp={() => fileHandleUp()}
                        actionDown={() => fileHandleDown()}
                        pageNumber={1}
                        documentDetail={detail}
                        toggle={true}
                    />
                )}
            {detailOn && (
                 <button onClick={() => setDetailOn(!detailOn)} style={{
                    position:"fixed",
                    width:"100px",
                    backgroundColor:"white",
                    borderRadius:"999px",
                    border:"2px solid #032b91",
                    left:"190px",
                    top:"134px",
                    height:"32px",
                 }}>
                {"<"} Quay lại</button>   
            )}
            <div className="list">
                
                {!detailOn && (status === "printing" && (PrintingList.map((val) => {
                    return (
                        <div className="row" id="printing" onClick={() => handleDetail()}>
                            <img src={val.image} id="picture" alt=""/>
                            <div className="info">
                                <p className="title">{val.title}</p>
                                <progress value={val.progress}/>
                                <p style={{display: "inline", marginLeft:"50px"}}>{val.progress}%</p>
                            </div>
                        </div>
                    );
                }))) ||
                (!detailOn && status === "printed" && (PrintedList.map((val) => {
                    return (
                        <div className="row" id="printed" onClick={() => handleDetail()}>
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