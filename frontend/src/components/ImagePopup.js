function ImagePopup({isOpen, onClose, selectedCard}) {
    return (
        <div className={`popup popup-image  ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container-image">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img className="popup__image" src={selectedCard?.link} alt="Просмотр" />
                <p className="popup__text">{selectedCard?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;