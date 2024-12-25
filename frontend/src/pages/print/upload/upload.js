import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../../App.css";
import "../Print.css";
import "./upload.css";
import { useState } from "react";

function Upload() {

    useEffect(() => {
        document.title = 'Tải lên';
    }, []);

    const [fileList, setFileList] = useState([]); // Danh sách file tải lên

    const [fileUrl, setFileUrl] = useState("");

    const fileBrowseHandler = (event) => {
        let value = URL.createObjectURL(event.target.files[0]);
        setFileUrl(value);
    };

    // Thêm tệp mới
    const handleAddFile = (event) => {
        const file = event.target.files[0]; // Lấy file từ input
        fileBrowseHandler(event);
        if (file) {
            setFileList([{ fid: Date.now(), fileName: file.name, filePath: `./docs/${file.name}`, uri: fileUrl, pageNumber: 16, fileThumbnail: fileUrl, fileType: "pdf" }, ...fileList]);
        }
    };

    const nextAction = (event) => {
        sessionStorage.setItem('file', JSON.stringify(fileList));    
    }

    // Xóa tệp
    const handleRemoveFile = (id) => {
        setFileList(fileList.filter((file) => file.fid !== id));
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
                                <span>{file.fileName}</span>
                                <span
                                    className="remove-btn"
                                    onClick={() => handleRemoveFile(file.id)}
                                >
                                    &times;
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Upload;
