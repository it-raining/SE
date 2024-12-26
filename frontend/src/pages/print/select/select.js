import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../App.css";
import "../Print.css";
import "./select.css";
import { useSpring, animated } from '@react-spring/web';

function PrinterSelect() {

    useEffect(() => {
        document.title = 'Chọn máy';
    }, []);

    const printers = [
        {
            ptid: 1,
            name: "Xerox C235 Colour Multifunction Printer",
            compatible: true,
            color: true,
            status: "free",
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
            ptid: 2,
            name: "Ricoh Aficio MP 3352 (2016)",
            compatible: true,
            color: false,
            status: "free",
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
            ptid: 3,
            name: "Toshiba e-STUDIO 3015AC",
            compatible: false,
            color: true,
            status: "busy",
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
    
    const [expandedPrinter, setExpandedPrinter] = useState(null);

    const handlePrinterClick = (ptid) => {
        setExpandedPrinter(expandedPrinter === ptid ? null : ptid);
        setPrinterSelected(ptid);
    };

    const [printerSelected, setPrinterSelected] = useState(null);

    const [confirmPopup, setConfirmPopup] = useState(false);

    const handleNext = () => {

        const file = JSON.parse(sessionStorage.getItem('file'));
        const detail = JSON.parse(sessionStorage.getItem('detail'));

        const fileList = JSON.parse(sessionStorage.getItem('fileList'));
        const configureList = JSON.parse(sessionStorage.getItem('configureList'));
        const printList = JSON.parse(sessionStorage.getItem('printList'));

        const confID = Date.now();

        const newFileList = [
            ...file,
            ...fileList
        ];

        const newConfigureList = [
            {cid: confID,
                fid: file.map((file) => file.fid),
                ...detail},
            ...configureList
        ];

        const newPrintList = [
            {
                uid: Number(sessionStorage.getItem('uid')),
                cid: confID,
                ptid: printerSelected,
            },
            ...printList
        ];

        sessionStorage.setItem('fileList', JSON.stringify(newFileList));
        sessionStorage.setItem('configureList', JSON.stringify(newConfigureList));
        sessionStorage.setItem('printList', JSON.stringify(newPrintList));
        sessionStorage.setItem('config', confID);

        setTimeout(() => {
            window.location.href = "/print/confirm";
        }, 2000);       
    };

    const [forward, setForward] = useState(true)

    const springs = useSpring({
        y: forward ? 60 : -60,
    })

    const handleClick = () => {
        setForward(s => !s)
    } 

    const handleStatus = (value) => {
        if (value === "free") return "Rảnh";
        return "Bận";
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
                            onClick={() => printer.compatible && handlePrinterClick(printer.ptid)}
                        >
                            <img src={printer.image} alt={printer.name} className="printer-image" />
                            <div className="printer-details">
                                <h3>{printer.name}</h3>
                                <ul>
                                    <li className={printer.compatible ? "check" : "cross"}>
                                        {printer.compatible ? 
                                            "Phù hợp với cấu hình bạn chọn" 
                                            : 
                                            "Không phù hợp với cấu hình bạn chọn"}
                                    </li>
                                    <li className={printer.color ? "check" : "cross"}>
                                        {printer.color ? "Có thể in màu" : "Không thể in màu"}
                                    </li>
                                </ul>
                                <p className="status" 
                                    id={(printer.ptid === printerSelected) ? 
                                        "selected" 
                                        : 
                                        printer.status}>
                                    {(printer.ptid === printerSelected) ? 
                                        "Đã chọn" 
                                        : 
                                        handleStatus(printer.status)}
                                </p>
                            </div>
                        </div>
                        {expandedPrinter === printer.ptid && (
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
            {confirmPopup && (<div className="flex-container">
                <animated.div
                    onClick={handleClick}
                    style={{
                        width: 500,
                        height: 40,
                        background: 'white',
                        filter: 'drop-shadow(4px 4px 5px #ddd)',
                        borderRadius: 24,
                        alignContent: 'center',
                        margin: 'auto',
                        textAlign: 'center',
                        ...springs,
                    }}
                >Tiến trình đã được lưu vào hàng chờ</animated.div>
            </div>)}
            <div className="actions">
                <Link to="/print/configure">
                    <button className="back-button">
                        Quay lại
                    </button>
                </Link>
                    <button className="confirm-button" 
                        disabled={!printerSelected} 
                        onClick={() => {
                            handleNext(); 
                            setConfirmPopup(true); 
                            handleClick()
                            }
                        }
                    >
                        In
                    </button>
            </div>
        </div>
    );
};

export default PrinterSelect;