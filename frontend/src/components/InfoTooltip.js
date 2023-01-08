import error from '../images/error.svg';
import success from '../images/success.svg';

function InfoTooltip({ isOpen, onClose, isError }) {
    return (
        <div className={`popup popup-info-tooltip  ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container-info-tooltip">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img className="popup__info-tooltip" src={isError ? error : success} alt="info-tooltip" />
                <p className="popup__info-tooltip-text">
                    {isError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip;