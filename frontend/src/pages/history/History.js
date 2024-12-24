import React, { useState } from 'react';
import "../../App.css";
import "./History.css";
import DocumentDetail from "../../components/DocumentDetail";
import Search from "../../assets/search.png";

function History() {

    const PrintingList = JSON.parse(sessionStorage.getItem('printingList'))
    .filter((print) => {
        return print.uid === Number(sessionStorage.getItem('uid'));
    })

    const PrintedList = JSON.parse(sessionStorage.getItem('printedList'))
    .filter((print) => {
        return print.uid === Number(sessionStorage.getItem('uid'));
    })

    const filteredPrintingList = () => {

        const fileList = JSON.parse(sessionStorage.getItem('fileList'));

        const newList = PrintingList.map((print) => {
            const configure = JSON.parse(sessionStorage.getItem('configureList'))
            .find((conf) => {
                return conf.cid === print.cid;
            });
            return configure ? { ...print, ...configure, title : "" } : {};
        });

        newList.map((print) => {
            for (let i = 0; i < print.fid.length; i++) {
                print.title += fileList.find((file) => {return file.fid === print.fid[i]}).name + ", ";
            }
            return print;
        });
        
        return newList.filter((val) => {
            if (!searchVal) return val;
            return val.title.includes(searchVal) && val;
        });
    }

    const filteredPrintedList = () => {

        const fileList = JSON.parse(sessionStorage.getItem('fileList'));

        const newList = PrintedList.map((print) => {
            const configure = JSON.parse(sessionStorage.getItem('configureList'))
            .find((conf) => {
                return conf.cid === print.cid;
            });
            return configure ? { ...print, ...configure, title : "" } : {};
        });

        newList.map((print) => {
            for (let i = 0; i < print.fid.length; i++) {
                print.title += fileList.find((file) => {return file.fid === print.fid[i]}).name + ", ";
            }
            return print;
        });
        
        return newList.filter((val) => {
            if (!searchVal) return val;
            return val.fid.includes(searchVal) && val;
        });
    }

    const [key, setKey] = useState(0);

    const [searchVal, setSearchVal] = useState('');

    const [status, setStatus] = useState('printingList');

    const file = () => {
        const fid = (status === "printingList") ? (filteredPrintingList()[key].fid): (filteredPrintedList()[key].fid);
        const fileList = JSON.parse(sessionStorage.getItem('fileList'));

        const file = fileList.filter((file) => fid.includes(file.fid));
        return file;
    }
    
    const [detailOn, setDetailOn] = useState(false);
    const [index, setIndex] = useState(0);
    const fileHandleUp = () => {
        const length = file().length;
        setIndex((length + index - 1) % length);
    }
    
    const fileHandleDown = () => {
        const length = file().length;
        setIndex((index + 1) % length);
    }
    
    const handleDetail = (value) => {
        setDetailOn(!detailOn);
        setKey(value);
        setIndex(0);
    }
    
    return(
        <div className="History">
            
            {!detailOn && (
            <div className="tab-list">
                <button id="printing" onClick={() => setStatus('printingList')}>
                    <p>Đang in</p>
                    <box className="notif" id={status === "printingList" ? "active" : "inactive"}>{PrintingList.length}</box>
                </button>
                <button id="printed" onClick={() => setStatus('printedList')}>   
                    <p>Đã in</p>   
                    <box className="notif" id={status === "printedList" ? "active" : "inactive"}>{PrintedList.length}</box>              
                </button>
            </div>)}
            {!detailOn && (
            <div className="filter">
                <div className="search-bar">
                    <img src={Search} className="search-icon" alt=""/>
                    <input type='search' id="search" onChange={e => setSearchVal(e.target.value)} placeholder="Nhập để tìm kiếm..."/>
                </div>              
            </div>)}
            {detailOn && (
                <DocumentDetail
                    fileType="img"
                    filePath={JSON.parse(sessionStorage.getItem('preview'))}
                    fileName={file()[index].name}
                    fileCount={file().length}
                    printer={sessionStorage.getItem('printer')}
                    actionUp={() => fileHandleUp()}
                    actionDown={() => fileHandleDown()}
                    pageNumber={1}
                    documentDetail={(status === "printingList") ? filteredPrintingList(): filteredPrintedList()}
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
                {(!detailOn && (status === "printingList" && (filteredPrintingList().map((val, key) => {
                    return (
                        <div className="row" id="printing" onClick={() => handleDetail(key)}>
                            <img src={val.thumb} id="picture" alt=""/>
                            <div className="info">
                                <p className="title">{val.title}</p>
                                <progress value={val.progress}/>
                                <p style={{display: "inline", marginLeft:"50px"}}>{val.progress}%</p>
                            </div>
                        </div>
                    );
                })))) ||
                ((!detailOn && status === "printedList" && (filteredPrintedList().map((val, key) => {
                    return (
                        <div className="row" id="printed" onClick={() => handleDetail(key)}>
                            <img src={val.thumb} id="picture" alt=""/>
                            <div className="info">
                                <p className="title">{val.title}</p>
                            </div>
                        </div>
                    );
                }))))}
            </div>
        </div>
    );
}

export default History;
