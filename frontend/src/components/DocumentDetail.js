import React from "react";
import "./DocumentDetail.css";
import ActionUp from "../assets/actionup.png";
import ActionDown from "../assets/actiondown.png";

function DocumentDetail({fileType, filePath, fileName, fileCount, printer, documentDetail, toggle, actionUp, actionDown}) {
    return(
        <div className="DocumentDetail" style={(toggle) ? {} : { display: 'none' }}>
            <div className="base">
                <div className="info">
                    <button className="action" id="up" onClick={actionUp}><img src={ActionUp} alt=""/></button>
                    <button className="action" id="down" onClick={actionDown}><img src={ActionDown} alt=""/></button>
                    <p className="name">{fileName}</p>
                    <p className="file">Có {fileCount} tệp tin</p>
                    <p className="printer">Máy in: {printer}</p>
                    <p className="config">Thiết đặt:</p>
                    <div className="detailList">
                        <li className="row">
                            <div className="detail">
                                Chọn trang in:&nbsp;{(documentDetail[0].pageRange === "all") ? "In tất cả" : "Tùy chọn"}
                            </div>
                            <div className="detail">
                                Số trang in:&nbsp;{(documentDetail[0].pageRange === "all") ? "16" : documentDetail[0].pagesToPrint}
                            </div>
                            <div className="detail">
                                Hướng in:&nbsp;{(documentDetail[0].orientation === "Landscape") ? "Ngang" : "Dọc"}
                            </div>
                            <div className="detail">
                                Số trang mỗi tờ:&nbsp;{documentDetail[0].pagesPerSheet}
                            </div>
                            <div className="detail">
                                Xếp bộ theo thứ tự:&nbsp;{(documentDetail[0].collate === "Yes") ? "1, 2, 3" : "3, 2, 1"}
                            </div>
                            <div className="detail">
                                Chế độ màu:&nbsp;{(documentDetail[0].colorMode === "colored") ? "Màu sắc" : "Đen trắng"}
                            </div>
                            <div className="detail">
                                Kích thước giấy:&nbsp;{documentDetail[0].paperSize}
                            </div>
                            <div className="detail">
                                Số bản in:&nbsp;{documentDetail[0].copies}
                            </div> 
                        </li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocumentDetail