import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "../../../App.css";
import "../Print.css";
import "./configure.css";

function Configure() {
    const fileList = JSON.parse(sessionStorage.getItem('file'));
	const [previewSrc, setPreviewSrc] = useState(require("../../../assets/portrait.png"));
    const file = fileList.reduce((acc, curr) => {
        acc["name"] = acc["name"] ? [...acc["name"], curr.name + ", "] : [curr.name + ", "];
        return acc;
    }, {});

    const [Preview] = useState(require("../../../assets/huh.jpg")); // Đường dẫn ảnh xem trước (mock data)
    const [selectedAttributes, setSelectedAttributes] = useState({
        fileName: file.name,
        pageRange: "all", // "all" hoặc "custom"
        pagesToPrint: "",
        orientation: "Portrait",
        pagesPerSheet: "1",
        collate: "Yes",
        colorMode: "colored",
        paperSize: "A4",
        resolution: "300dpi",
        copies: "1",
    });

    const [currentStep, setCurrentStep] = useState(2); // Quản lý bước hiện tại

    // Hàm xử lý thay đổi thuộc tính và cập nhật preview
    const handleAttributeChange = (key, value) => {
        const updatedAttributes = { ...selectedAttributes, [key]: value };
        setSelectedAttributes(updatedAttributes);

        // Xây dựng logic cập nhật preview
        let newPreviewSrc = require("../../../assets/portrait.png");

        const isPortrait = updatedAttributes.orientation === "Portrait";
        const isColor = updatedAttributes.colorMode === "colored";

        if (isPortrait && isColor) {
            newPreviewSrc = require("../../../assets/portrait.png");
        } else if (!isPortrait && isColor) {
            newPreviewSrc = require("../../../assets/landscape.png");
        } 

        setPreviewSrc(newPreviewSrc); // Cập nhật ảnh preview
    };

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="Print">
            {/* Header */}
            <div className="steps-header">
                <div className={`step ${currentStep === 1 ? "active" : ""}`}>1. Tải tệp tin</div>
                <div className={`step ${currentStep === 2 ? "active" : ""}`}>2. Thiết đặt</div>
                <div className={`step ${currentStep === 3 ? "active" : ""}`}>3. Chọn máy</div>
                <div className={`step ${currentStep === 4 ? "active" : ""}`}>4. Xác nhận</div>
            </div>

            {/* Nội dung chính */}
            <div className="main-content">
                {/* Khối bên trái */}
                <div className="left-panel">
                    <div className="attributes">
                        {/* Tên tệp */}
                        <div className="attribute">
                            <label>Tên tệp:</label>
                            {selectedAttributes.fileName}
                        </div>

                        {/* Chọn trang in */}
                        <div className="attribute">
                            <label>Chọn trang in:</label>
                            <select
                                value={selectedAttributes.pageRange}
                                onChange={(e) => handleAttributeChange("pageRange", e.target.value)}
                            >
                                <option value="all">In tất cả</option>
                                <option value="custom">Tùy chọn</option>
                            </select>
                        </div>

                        {/* Số trang in */}
                        <div className="attribute">
                            <label>Số trang in:</label>
                            <input
                                type="number"
                                value={selectedAttributes.pagesToPrint}
                                onChange={(e) => handleAttributeChange("pagesToPrint", e.target.value)}
                                disabled={selectedAttributes.pageRange === "all"} // Vô hiệu hóa nếu chọn "In tất cả"
                                placeholder={
                                    selectedAttributes.pageRange === "all"
                                        ? "Không cần nhập khi in tất cả"
                                        : "Nhập số trang"
                                }
                                style={{
                                    backgroundColor: selectedAttributes.pageRange === "all" ? "#f1f1f1" : "white",
                                    cursor: selectedAttributes.pageRange === "all" ? "not-allowed" : "text",
                                }}
                            />
                        </div>

                        {/* Các thuộc tính khác */}
                        <div className="attribute">
                            <label>Hướng in:</label>
                            <select
                                value={selectedAttributes.orientation}
                                onChange={(e) => handleAttributeChange("orientation", e.target.value)}
                            >
                                <option value="Portrait">Dọc</option>
                                <option value="Landscape">Ngang</option>
                            </select>
                        </div>
                        <div className="attribute">
                            <label>Số trang mỗi tờ:</label>
                            <select
                                value={selectedAttributes.pagesPerSheet}
                                onChange={(e) => handleAttributeChange("pagesPerSheet", e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="4">4</option>
                                <option value="8">8</option>
                            </select>
                        </div>
                        <div className="attribute">
                            <label>Xếp bộ theo thứ tự:</label>
                            <select
                                value={selectedAttributes.collate}
                                onChange={(e) => handleAttributeChange("collate", e.target.value)}
                            >
                                <option value="Yes">1, 2, 3</option>
                                <option value="No">3, 2, 1</option>
                            </select>
                        </div>
                        <div className="attribute">
                            <label>Chế độ màu:</label>
                            <select
                                value={selectedAttributes.colorMode}
                                onChange={(e) => handleAttributeChange("colorMode", e.target.value)}
                            >
                                <option value="colored">Màu sắc</option>
                                <option value="monochrome">Đen trắng</option>
                            </select>
                        </div>

                        <div className="attribute">
                            <label>Kích thước giấy:</label>
                            <select
                                value={selectedAttributes.paperSize}
                                onChange={(e) => handleAttributeChange("paperSize", e.target.value)}
                            >
                                <option value="A4">A4</option>
                                <option value="A3">A3</option>
                                <option value="Letter">Letter</option>
                            </select>
                        </div>

                        <div className="attribute">
                            <label>Số bản in:</label>
                            <select
                                value={selectedAttributes.copies}
                                onChange={(e) => handleAttributeChange("copies", e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                    </div>

                    {/* Nút điều hướng */}
                    <div className="navigation-buttons">
                        <Link to="/print/upload">
                            <button to="upload" className="back-button" onClick={handleBack} disabled={currentStep === 1}>
                                Quay Lại
                            </button>
                        </Link>
                        <Link to="/print/select">
                            <button to="select" className="next-button" onClick={handleNext} disabled={currentStep === 4}>
                                Tiếp Theo
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Khối bên phải */}
                <div className="right-panel">
                    <div className="preview-title">
                        <label>Xem Trước Tệp</label>
                    </div>
                    <div className="preview-image">
                        <img src={previewSrc} alt="Preview" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Configure;