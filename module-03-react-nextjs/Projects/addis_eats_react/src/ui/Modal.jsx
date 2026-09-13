function Modal({ title, children, onClose }) {
    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{title}</h2>

                <div className="modal-content">
                    {children}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default Modal;