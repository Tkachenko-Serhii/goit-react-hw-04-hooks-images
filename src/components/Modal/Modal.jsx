import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ src, onClose }) {
  useEffect(() => {
    const handleModalClose = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleModalClose);
    return () => {
      window.removeEventListener("keydown", handleModalClose);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <>
      <div className={s.overlay} onClick={handleBackdropClick}>
        <div className={s.Modal}>
          <img src={src} alt='' />
        </div>
      </div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
