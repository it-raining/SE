import React from 'react';
import { Link } from 'react-router-dom';
import "../../../App.css";
import "../Print.css";
import "./upload.css";
import { useState } from "react";

function Upload() {
    const [fileList, setFileList] = useState([]); // Danh sách file tải lên

    // Thêm tệp mới
    const handleAddFile = (event) => {
        const file = event.target.files[0]; // Lấy file từ input
        if (file) {
            setFileList([...fileList, { name: file.name, id: Date.now() }]);
        }
    };

    const nextAction = (event) => {
        sessionStorage.setItem('file', JSON.stringify(fileList));    
    }

    // Xóa tệp
    const handleRemoveFile = (id) => {
        setFileList(fileList.filter((file) => file.id !== id));
    };

    // Hủy (xóa toàn bộ danh sách file)
    const handleCancel = () => {
        setFileList([]);
        window.location.href = "/print";
    };

    // Tiếp theo
    return (
        <div className="Upload">
            {/* Header */}
            <div className="steps-header">
                <div className="step active">1. Tải tệp tin</div>
                <div className="step">2. Thiết đặt</div>
                <div className="step">3. Chọn máy in</div>
                <div className="step">4. Xác nhận</div>
            </div>

            {/* Nội dung */}
            <div className="upload-container">
                {/* Panel bên trái */}
                <div className="upload-left">
                    <div className="upload-box">
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleAddFile}
                        />
                        <label htmlFor="fileInput">
                            <div>
                                <span className="icon">&#8681;</span>
                                <p><i>Thêm tập tin</i></p>
                                <small><b>Định dạng cho phép:</b> .doc, .docx, .pdf, .png</small><br/>
                                <small><b>Kích thước tối đa:</b> 100MB</small>
                            </div>
                        </label>
                    </div>
                    <div className="navigation-buttons">
                        <button className="cancel-button" onClick={handleCancel}>
                            Hủy
                        </button>
                        <Link to="/print/configure">
                            <button className="next-button" disabled={fileList.length === 0} onClick={() => nextAction()}>
                                Tiếp Theo
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Panel bên phải */}
                <div className="upload-right">
                    <div className="file-list-title">
                        <label>Danh sách file</label>
                    </div>
                    <div className="file-list">
                        {fileList.map((file) => (
                            <div key={file.id} className="file-item">
                                <span>{file.name}</span>
                                <span
                                    className="remove-btn"
                                    onClick={() => handleRemoveFile(file.id)}
                                >
                                    &times;
                                </span>
                            </div>
                        ))}
                        {fileList.length === 0 && (
                            <p>Chưa có tệp nào được thêm.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;