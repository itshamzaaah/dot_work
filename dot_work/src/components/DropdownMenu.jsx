import { useState, useRef, useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import DropdownMenu from "./DropdownMenu";

export default function SubmissionActions({ submission, onDownloadPDF, onDownloadZIP, onSendResults, onDelete }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <button
        className="p-2 border border-gray-200 rounded hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <HiOutlineDotsHorizontal className="w-4 h-4" title="More actions" />
      </button>
      {open && (
        <DropdownMenu
          onDownloadPDF={() => onDownloadPDF(submission)}
          onDownloadZIP={() => onDownloadZIP(submission)}
          onSendResults={() => onSendResults(submission)}
          onDelete={() => onDelete(submission)}
        />
      )}
    </div>
  );
}
