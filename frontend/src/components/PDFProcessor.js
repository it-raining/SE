import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs";

// Set the PDF.js worker to use the locally installed one 
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PDFProcessor = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);

      // Load the PDF document
      const pdf = await pdfjsLib.getDocument(fileURL).promise;

      // Set the number of pages
      setPageCount(pdf.numPages);

      // Get the first page to render as a thumbnail
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });

      // Create a canvas for rendering
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render the page onto the canvas
      await firstPage.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      // Generate the thumbnail as a data URL
      setThumbnail(canvas.toDataURL());
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handlePDFUpload} />
      {pageCount > 0 && <p>Total Pages: {pageCount}</p>}
      {thumbnail && <img src={thumbnail} alt="PDF Thumbnail" />}
    </div>
  );
};

export default PDFProcessor;