import React, { useState } from "react";
import "./DocumentDetail.css";
import ActionUp from "../assets/actionup.png";
import ActionDown from "../assets/actiondown.png";

function DocumentDetail({fileType, filePath, fileName, fileCount, printer, pageNumber, documentDetail, toggle, actionUp, actionDown}) {
    return(
        <div className="DocumentDetail" style={(toggle) ? {} : { display: 'none' }}>
            <div className="base">
                <img className="document" src={filePath} alt=""/>
                <div className="info">
                    <button className="action" id="up"><img src={ActionUp} alt=""/></button>
                    <button className="action" id="down"><img src={ActionDown} alt=""/></button>
                    <p className="name">{fileName}</p>
                    <p className="file">Có {fileCount} tệp tin</p>
                    <p className="printer">Máy in: {printer}</p>
                    <p className="config">Thiết đặt:</p>
                    <div className="detailList">
                        {documentDetail.map((val) => {
                            return (
                                <li className="row">
                                    <div id="detail">{val}</div>
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