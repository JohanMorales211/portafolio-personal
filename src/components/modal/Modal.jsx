import React from 'react';
import { FiX } from 'react-icons/fi';
import './modal.css';
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="modal_overlay" onClick={onClose}>
      <div className="modal_content" onClick={(e) => e.stopPropagation()}>
        <button className="modal_close_button" onClick={onClose} aria-label="Cerrar modal">
          <FiX />
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;