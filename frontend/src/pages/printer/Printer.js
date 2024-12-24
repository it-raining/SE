import React, { useState } from 'react';
import "../../App.css";
import "./Printer.css";

function Printer() {
    const printers = JSON.parse(sessionStorage.getItem('printerList'))
        
    const [expandedPrinter, setExpandedPrinter] = useState(null);
    
    const handlePrinterClick = (printerName) => {
            setExpandedPrinter(expandedPrinter === printerName ? null : printerName);
    };

    return(
        <div className="Printer">
                {printers.map((printer, index) => (
                    <div key={index}>
                        <div
                            className={`printer-item ${"compatible"}`}
                            onClick={() => handlePrinterClick(printer.name)}
                        >
                            <img src={printer.image} alt={printer.name} className="printer-image" />
                            <div className="printer-details">
                                <h3>{printer.name}</h3>
                                <ul>
                                    <li className={printer.color ? "check" : "cross"}>
                                        {printer.color ? "Có thể in màu" : "Không thể in màu"}
                                    </li>
                                </ul>
                                <p className="status" id={(printer.status === "busy") ? "busy" : "free"}>{(printer.status === "busy") ? "Bận" : "Rảnh"}</p>
                            </div>
                        </div>
                        {expandedPrinter === printer.name && (
                            <div className="printer-extra-details">
                                <p>Khổ giấy: {printer.paper + ''}</p>
                                <p>Tốc độ: {printer.speed}ppm </p>
                                <p>Độ phân giải in: {printer.resolution[0]} x {printer.resolution[1]} dpi</p>
                                <p>Địa chỉ: {printer.location}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
    );
}

export default Printer;


            