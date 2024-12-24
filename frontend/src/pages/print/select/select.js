import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../App.css";
import "../Print.css";
import "./select.css";

function PrinterSelect() {
    const printers = [
        {
            name: "Xerox C235 Colour Multifunction Printer",
            compatible: true,
            color: true,
            status: "Rảnh",
            image: require("../../../assets/printer1.png"),
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
            image: require("../../../assets/printer2.png"),
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
            compatible: false,
            color: true,
            status: "Bận",
            image: require("../../../assets/printer1.png"),
            details: {
                paper: "Khổ giấy: A3 A4",
                speed: "Tốc độ: 22ppm",
                resolution: "Độ phân giải in: 1200x1200 dpi",
                location: "Tầng 1, Phòng 101",
                timeRemaining: "15 phút còn lại",
            },
        },
    ];

    useEffect(() => {
        const inputField = document.getElementById('new_myField');
    },[])
    
    const [expandedPrinter, setExpandedPrinter] = useState(null);

    const handlePrinterClick = (printerName) => {
        setExpandedPrinter(expandedPrinter === printerName ? null : printerName);
        setPrinterSelected(printerName);
    };

    const [printerSelected, setPrinterSelected] = useState(null);

    const handleNext = () => {
        sessionStorage.setItem('printer', printerSelected);
    }

    return (
        <div className="printer-list">
            {/* Header */}
            <div className="steps-header">
                <div className="step">1. Tải tệp tin</div>
                <div className="step">2. Thiết đặt</div>
                <div className="step active">3. Chọn máy in</div>
                <div className="step">4. Xác nhận</div>
            </div>

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
                                    <li className={printer.compatible ? "check" : "cross"}>
                                        {printer.compatible ? "Phù hợp với cấu hình bạn chọn" : "Không phù hợp với cấu hình bạn chọn"}
                                    </li>
                                    <li className={printer.color ? "check" : "cross"}>
                                        {printer.color ? "Có thể in màu" : "Không thể in màu"}
                                    </li>
                                </ul>
                                <p className="status">{(printer.status === "Rảnh" && printer.name === printerSelected) ? "Đã chọn" : printer.status}</p>
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
            <div className="actions">
                <Link to="/print/configure">
                    <button className="back-button">
                        Quay lại
                    </button>
                </Link>
                <Link to="/print/confirm">
                    <button className="confirm-button" onClick={() => handleNext()}>
                        In
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PrinterSelect;