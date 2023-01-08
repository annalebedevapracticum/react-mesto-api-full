import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const { loading } = React.useContext(CurrentUserContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        })
    }

    React.useEffect(() => {
        setName('');
        setLink('')
    }, [isOpen]);

    return (
        <PopupWithForm name='add-card' title='Новое место' className='add-form' isOpen={isOpen} onClose={onClose} submitText="Создать" onSubmit={handleSubmit} isLoading={loading}>
            <input value={name} onChange={handleNameChange} name="name" className="popup__inputs" id="popup__card-name" type="text" placeholder="Название"
                required minLength="2" maxLength="30" />
            <span className="popup__error popup__card-name-error"></span>
            <input value={link} onChange={handleLinkChange} name="link" type="url" className="popup__inputs" id="popup__card-link" required
                placeholder="Ссылка на картинку" />
            <span className="popup__error popup__card-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;