import React from 'react';

function Modal({ show, onClose, icon, title, message }) {
    return (
        <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center align-items-center">
                        {icon}
                    </div>
                    <div className="modal-body text-center">
                        <h5 className="modal-title">{title}</h5>
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
