import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children, isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__close" onClick={() => setIsOpen(!isOpen)}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
