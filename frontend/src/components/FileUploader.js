import React, { useState } from "react";
import PDFProcessor from "./PDFProcessor";

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div>
      <PDFProcessor file={file}/>
    </div>
  );
};

export default FileUploader;