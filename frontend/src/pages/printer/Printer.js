import React, { useState } from 'react';
import "../../App.css";
import "./Printer.css";

function Printer() {
    const printers = [
            {
                name: "Xerox C235 Colour Multifunction Printer",
                compatible: true,
                color: true,
                status: "Rảnh",
                image: require("../../assets/printer1.png"),
                details: {
                    paper: "Khổ giấy: A4",
                    speed: "Tốc độ: 22ppm",
                    resolution: "Độ phân giải in: 600x600 dpi",
                    location: "Tầng 2, Phòng 203",
                    timeRemaining: "5 phút còn lại",
                },
            },
            {
                name: "Ricoh Aficio MP 3352 (2016)",
                compatible: true,
                color: false,
                status: "Rảnh",
                image: require("../../assets/printer2.png"),
                details: {
                    paper: "Khổ giấy: A4 A5",
                    speed: "Tốc độ: 22ppm",
                    resolution: "Độ phân giải in: 3000x3000 dpi",
                    location: "Tầng 3, Phòng 305",
                    timeRemaining: "Sẵn sàng",
                },
            },
            {
                name: "Toshiba e-STUDIO 3015AC",
                compatible: true,
                color: true,
                status: "Bận",
                image: require("../../assets/printer1.png"),
                details: {
                    paper: "Khổ giấy: A3 A4",
                    speed: "Tốc độ: 22ppm",
                    resolution: "Độ phân giải in: 1200x1200 dpi",
                    location: "Tầng 1, Phòng 101",
                    timeRemaining: "15 phút còn lại",
                },
            },
        ];
        
        const [expandedPrinter, setExpandedPrinter] = useState(null);
    
        const handlePrinterClick = (printerName) => {
            setExpandedPrinter(expandedPrinter === printerName ? null : printerName);
        };

    return(
        <div className="printer-container">
                {printers.map((printer, index) => (
                    <div key={index}>
                        <div
                            className={`printer-item ${!printer.compatible ? "not-compatible" : ""}`}
                            onClick={() => printer.compatible && handlePrinterClick(printer.name)}
                        >
                            <img src={printer.image} alt={printer.name} className="printer-image" />
                            <div className="printer-details">
                                <h3>{printer.name}</h3>
                                <ul>
                              
                                    <li className={printer.color ? "check" : "cross"}>
                                        {printer.color ? "Có thể in màu" : "Không thể in màu"}
                                    </li>
                                </ul>
                                <p className="status" id={(printer.status === "Bận") ? "busy" : "free"}>{printer.status}</p>
                            </div>
                        </div>
                        {expandedPrinter === printer.name && (
                            <div className="printer-extra-details">
                                {printer.details.paper && <p>{printer.details.paper}</p>}
                                {printer.details.speed && <p>{printer.details.speed}</p>}
                                {printer.details.resolution && <p>{printer.details.resolution}</p>}
                                <p>Địa chỉ: {printer.details.location}</p>
                                <p>Thời gian hoàn thành: {printer.details.timeRemaining}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
    );
}

export default Printer;


            