function PopupWithForm({ title, name, children, className, isOpen, onClose, submitText, onSubmit, isLoading }) {
    return <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
        <form onSubmit={onSubmit} name={name} className={`popup__container ${className}`} >
            <button type="button" className="popup__close" onClick={onClose} ></button>
            <h3 className="popup__title">{title}</h3>
            {children}
            <button className="popup__submit" type="submit">{isLoading ? 'Подождите...' : submitText}</button>
        </form>
    </div>
}
export default PopupWithForm