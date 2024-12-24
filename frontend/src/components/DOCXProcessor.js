import React, { useEffect, useRef, useState } from "react";
import { renderAsync } from "docx-preview";

const DOCXProcessor = ({ file }) => {
  const [thumbnail, setThumbnail] = useState(null);
  const containerRef = useRef();

  useEffect(() => {
    const processDOCX = async () => {
      if (!file) return;

      // Read the file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();

      // Clear the container
      containerRef.current.innerHTML = "";

      // Render the DOCX file to HTML in the container
      await renderAsync(arrayBuffer, containerRef.current, null, {
        inWrapper: true, // Wrap content in a container
        showPageNumber: true,
      });

      // Use the first page of the rendered content
      const renderedContent = containerRef.current.querySelector(".docx");
      if (renderedContent) {
        const rect = renderedContent.getBoundingClientRect();
        const canvas = document.createElement("canvas");
        canvas.width = rect.width;
        canvas.height = rect.height;

        const context = canvas.getContext("2d");
        context.fillStyle = "#fff"; // Set background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(renderedContent, 0, 0, rect.width, rect.height);

        setThumbnail(canvas.toDataURL());
      }
    };

    processDOCX();
  }, [file]);

  return (
    <div>
      <div ref={containerRef} style={{ display: "none" }}></div>
      {thumbnail && <img src={thumbnail} alt="DOCX Thumbnail" />}
    </div>
  );
};

export default DOCXProcessor;