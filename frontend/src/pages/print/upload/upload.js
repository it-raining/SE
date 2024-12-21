import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../../App.css";
import "../Print.css";
import "./upload.css";

function Upload() {
    const [fileList, setFileList] = useState([]); 
    const [errorMessage, setErrorMessage] = useState(""); 

    const validFormats = [".doc", ".docx", ".pdf", ".png"];

    const handleAddFile = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase(); 
            if (validFormats.includes(`.${fileExtension}`)) {
                setFileList([...fileList, { name: file.name, id: Date.now() }]);
                setErrorMessage(""); 
            } else {
                setErrorMessage("Định dạng tệp không hợp lệ. Vui lòng chọn tệp .doc, .docx, .pdf, hoặc .png.");
            }
        }
    };

    const handleRemoveFile = (id) => {
        setFileList(fileList.filter((file) => file.id !== id));
    };

    const handleCancel = () => {
        setFileList([]);
        window.location.href = "/print";
    };

    const nextAction = () => {
        sessionStorage.setItem('file', JSON.stringify(fileList));
    };

    return (
        <div className="Upload">
            <div className="steps-header">
                <div className="step active">1. Tải tệp tin</div>
                <div className="step">2. Thiết đặt</div>
                <div className="step">3. Chọn máy in</div>
                <div className="step">4. Xác nhận</div>
            </div>

            <div className="upload-container">
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
                    {errorMessage && (
                        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
                    )}
                    <div className="navigation-buttons">
                        <button className="cancel-button" onClick={handleCancel}>
                            Hủy
                        </button>
                        <Link to="/print/configure">
                            <button
                                className="next-button"
                                disabled={fileList.length === 0}
                                onClick={nextAction}
                            >
                                Tiếp Theo
                            </button>
                        </Link>
                    </div>
                </div>

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
