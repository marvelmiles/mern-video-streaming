import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

function DragDropArea({
  dropView,
  onFilesTransfer,
  reset = false,
  accept = "",
  multiple = true,
  children
}) {
  const [dragActive, setDragActive] = React.useState(false);
  const [hasDropedFile, setHasDropedFile] = useState(false);
  useEffect(() => {
    if (reset) {
      setDragActive(false);
      setHasDropedFile(false);
    }
  }, [reset]);
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const onDataTransfer = e => {
    e.preventDefault();
    e.stopPropagation();
    setHasDropedFile(true);
    if (!hasDropedFile) {
      const files = [];
      if (e.dataTransfer && e.dataTransfer.files) {
        for (let file of e.dataTransfer.files) {
          if (file.type.indexOf(accept) >= 0) files.push(file);
        }
        files.length && onFilesTransfer(files);
      } else if (e.target.files) onFilesTransfer(e.target.files);
    }
  };
  return (
    <div
      onDrop={onDataTransfer}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      style={{
        // border: dragActive ? "1px solid red" : "1px solid green",
        position: "relative"
      }}
    >
      <input
        type="file"
        accept={
          {
            audio: "audio/*",
            image: "image/*",
            video: "video/*"
          }[accept]
        }
        id="drag-drop-area-input-file-upload"
        multiple={multiple}
        style={{ display: "none" }}
        onChange={onDataTransfer}
      />
      <label
        htmlFor="drag-drop-area-input-file-upload"
        // style={{ border: dragActive ? "border 1px solid red" : "" }}
      >
        {children}
      </label>
      {hasDropedFile ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "100%"
            // border: "1px solid pink"
          }}
        >
          {dropView}
        </div>
      ) : null}
    </div>
  );
}

DragDropArea.propTypes = {};

export default DragDropArea;
