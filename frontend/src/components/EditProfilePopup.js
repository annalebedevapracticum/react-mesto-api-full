import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');
    const { currentUser, loading } = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleAboutChange(e) {
        setAbout(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about,
        })
    }

    return (
        <PopupWithForm name='info' title='Редактировать профиль' className='profile-form' isOpen={isOpen} onClose={onClose} submitText="Сохранить" onSubmit={handleSubmit} isLoading={loading}>
            <input name="name" className="popup__inputs" id="popup__name" type="text"
                minLength="2" maxLength="40" required value={name || ''} onChange={handleNameChange} />
            <span className="popup__error popup__name-error"></span>
            <input name="about" className="popup__inputs" id="popup__job" type="text"
                required minLength="2" maxLength="200" value={about || ''} onChange={handleAboutChange} />
            <span className="popup__error popup__job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;