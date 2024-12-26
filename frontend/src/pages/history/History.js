import React, { useState, useEffect } from 'react';
import "../../App.css";
import "./History.css";
import DocumentDetail from "../../components/DocumentDetail";
import Search from "../../assets/search.png";

function History() {

    useEffect(() => {
        document.title = 'Lịch sử';
    }, []);
    
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
            const printerList = JSON.parse(sessionStorage.getItem('printerList'))
            .find((printer) => {
                return printer.ptid === print.ptid;
            });
            const configure = JSON.parse(sessionStorage.getItem('configureList'))
            .find((conf) => {
                return conf.cid === print.cid;
            });
            return configure ? 
                { ...print, ...configure, title : "", printer: printerList.name } : {};
        });


        newList.map((print) => {
            for (let i = 0; i < print.fid.length; i++) {
                print.title += fileList.find((file) => {
                    return file.fid === print.fid[i]
                }).fileName + ", ";
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
            const printerList = JSON.parse(sessionStorage.getItem('printerList'))
            .find((printer) => {
                return printer.ptid === print.ptid;
            });
            const configure = JSON.parse(sessionStorage.getItem('configureList'))
            .find((conf) => {
                return conf.cid === print.cid;
            });
            return configure ? 
                { ...print, ...configure, title : "", printer: printerList.name } : {};
        });


        newList.map((print) => {
            for (let i = 0; i < print.fid.length; i++) {
                print.title += fileList.find((file) => {
                    return file.fid === print.fid[i]
                }).fileName + ", ";
            }
            return print;
        });
        
        return newList.filter((val) => {
            if (!searchVal) return val;
            return val.title.includes(searchVal) && val;
        });
    }

    const printList = (value) => {
        return status === "printingList" ? filteredPrintingList(): filteredPrintedList();
    }

    const [key, setKey] = useState(0);

    const [searchVal, setSearchVal] = useState('');

    const [status, setStatus] = useState('printingList');

    const file = () => {
        const fid = printList(status)[key].fid;
        const fileList = JSON.parse(sessionStorage.getItem('fileList'));
        return fileList.filter((file) => fid.includes(file.fid));
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

    const [renderTrigger, setRenderTrigger] = useState(0); // Used to force re-render

    useEffect(() => {
        const interval = setInterval(() => {
            setRenderTrigger(renderTrigger);
            setRenderTrigger((prev) => prev + 1);
        }, 10);
        
        PrintedList.map((current) => {
            const tempList = PrintedList.filter((val) => {
                return  (val.uid !== current.uid) || 
                        (val.cid !== current.cid) || 
                        (val.ptid !== current.ptid); 
            });
            if (tempList.length > 1) {
                let count = 0;
                const newList = JSON.parse(sessionStorage.getItem('printedList'))
                .filter((val) => {
                    if (count < 1) { ++count; return val;}
                    return val.cid !== current.cid; 
                })
                sessionStorage.setItem('printedList', JSON.stringify(newList));
            }
            return false;
        })
        
        PrintingList.map((current) => {
            if (current.progress && current.progress[1] < Date.now()) {
                const newPrintingList = JSON.parse(sessionStorage.getItem('printingList'))
                .filter((val) => {
                    return  (val.uid !== current.uid) || 
                            (val.cid !== current.cid) || 
                            (val.ptid !== current.ptid); 
                })

                const newPrintedList = [
                    {
                        uid: current.uid,
                        cid: current.cid,
                        ptid: current.ptid,
                    },
                    ...JSON.parse(sessionStorage.getItem('printedList')),
                ]
        
                sessionStorage.setItem('printingList', JSON.stringify(newPrintingList));
                sessionStorage.setItem('printedList', JSON.stringify(newPrintedList));
            }
            return false;
        })

        return () => clearInterval(interval); // Cleanup
    });

    return(
        <div className="History">
            
            {!detailOn && (
            <div className="tab-list">
                <button id={status === "printingList" ? 
                        "active"
                        : 
                        "inactive"
                    } onClick={() => setStatus('printingList')
                }>
                    <p>Đang in</p>
                    <box className="notif" id={status === "printingList" ? 
                            "active" 
                            : 
                            "inactive"
                        }
                    >
                        {PrintingList.length}
                    </box>
                </button>
                <button id={status === "printedList" ?
                        "active" 
                        : 
                        "inactive"
                    } 
                    onClick={() => setStatus('printedList')
                }>   
                    <p>Đã in</p>   
                    <box className="notif"
                        id={status === "printedList" ? 
                            "active" 
                            : 
                            "inactive"
                        }
                    >
                        {PrintedList.length}
                    </box>              
                </button>
            </div>)}
            {!detailOn && (
            <div className="filter">
                <div className="search-bar">
                    <img src={Search} className="search-icon" alt=""/>
                    <input type='search' 
                        id="search" 
                        onChange={e => setSearchVal(e.target.value)} 
                        placeholder="Nhập để tìm kiếm..."
                    />
                </div>              
            </div>)}
            {detailOn && (
                <DocumentDetail
                    fileType="img"
                    filePath={require('../../assets/portrait.png')}
                    fileName={file()[index].fileName}
                    fileCount={file().length}
                    printer={printList(status)[key].printer}
                    actionUp={() => fileHandleUp()}
                    actionDown={() => fileHandleDown()}
                    pageNumber={1}
                    documentDetail={printList(status)[key]}
                    toggle={true}
                />
                )}
            {detailOn && (
                 <button className="back" onClick={() => setDetailOn(!detailOn)}>
                {"<"} Quay lại</button>   
            )}
            <div className="list">
                {(!detailOn && (status === "printingList" && (filteredPrintingList().map((val, key) => {
                    return (
                        <div className="row" id="printing" onClick={() => handleDetail(key)}>
                            <img src={require('../../assets/portrait.png')}
                                style={
                                    val.color === "monochrome" ?
                                        {filter:'monochrome(1)'}
                                        :
                                        {
                                    }
                                }
                                id="picture"
                                alt=""
                            />
                            <div className="info">
                                <p className="title">{val.title}</p>
                                <progress value={val.progress && val.progress[0]?
                                    (
                                        (val.progress[0] > Date.now()) ? 
                                            0 
                                            :
                                            ((val.progress[1] >= Date.now()) ?
                                                (Date.now() - val.progress[0]) / (val.progress[1] - val.progress[0])
                                                : 
                                                1
                                            )
                                        ) 
                                        :
                                        null
                                    }/>
                                <p style={{display: "inline", marginLeft:"50px"}}>
                                    {val.progress  && val.progress[0]?
                                        (
                                            parseFloat((val.progress[0] > Date.now()) ?
                                                0
                                                : ((val.progress[1] >= Date.now()) ?
                                                    100 * (Date.now() - val.progress[0]) / (val.progress[1] - val.progress[0])
                                                    :
                                                    100
                                                )
                                            ).toFixed(0) + '%'
                                        )
                                        : "Lỗi"
                                    }
                                </p>
                            </div>
                        </div>
                    );
                })))) ||
                ((!detailOn && status === "printedList" && (filteredPrintedList().map((val, key) => {
                    return (
                        <div className="row" id="printed" onClick={() => handleDetail(key)}>
                            <img src={require('../../assets/portrait.png')}
                                style={
                                    val.color === "monochrome" ?
                                    {filter:'grayscale(1)', border: '1px solid #aeaeae'}
                                    :
                                    {border: '1px solid #aeaeae'}
                                }
                                id="picture"
                                alt=""
                            />
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
