import React, { useState } from "react";
import "./DocumentDetail.css";
import ActionUp from "../assets/actionup.png";
import ActionDown from "../assets/actiondown.png";

function DocumentDetail({fileType, filePath, fileName, fileCount, printer, documentDetail, toggle, actionUp, actionDown}) {
    return(
        <div className="DocumentDetail" style={(toggle) ? {} : { display: 'none' }}>
            <div className="base">
                <img className="document" src={filePath} alt=""/>
                <div className="info">
                    <button className="action" id="up" onClick={actionUp}><img src={ActionUp} alt=""/></button>
                    <button className="action" id="down" onClick={actionDown}><img src={ActionDown} alt=""/></button>
                    <p className="name">{fileName}</p>
                    <p className="file">Có {fileCount} tệp tin</p>
                    <p className="printer">Máy in: {printer}</p>
                    <p className="config">Thiết đặt:</p>
                    <div className="detailList">
                        {documentDetail.map((val) => {
                            return (
                                <li className="row">
                                    <div className="detail">
                                        Chọn trang in:&nbsp;{(val.pageRange === "all") ? "In tất cả" : "Tùy chọn"}
                                    </div>
                                    <div className="detail">
                                        Số trang in:&nbsp;{(val.pageRange === "all") ? "*thêm sau" : val.pagesToPrint}
                                    </div>
                                    <div className="detail">
                                        Hướng in:&nbsp;{(val.orientation === "Landscape") ? "Ngang" : "Dọc"}
                                    </div>
                                    <div className="detail">
                                        Số trang mỗi tờ:&nbsp;{val.pagesPerSheet}
                                    </div>
                                    <div className="detail">
                                        Xếp bộ theo thứ tự:&nbsp;{(val.collate === "Yes") ? "1, 2, 3" : "3, 2, 1"}
                                    </div>
                                    <div className="detail">
                                        Chế độ màu:&nbsp;{(val.color === "colored") ? "Màu sắc" : "Đen trắng"}
                                    </div>
                                    <div className="detail">
                                        Kích thước giấy:&nbsp;{val.paperSize}
                                    </div>
                                    <div className="detail">
                                        Số bản in:&nbsp;{val.copies}
                                    </div> 
                                </li>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentDetail