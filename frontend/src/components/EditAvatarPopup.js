import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();
  const { currentUser, loading } = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    })
  }

  React.useEffect(() => {
    inputRef.current.value = currentUser.avatar;
  }, [isOpen]);

  return (
    <PopupWithForm onSubmit={handleSubmit} name='avatar' title='Обновить ававтар' className='avatar-form' isOpen={isOpen} onClose={onClose} submitText="Сохранить" isLoading={loading}>
      <input ref={inputRef} name="avatar" type="url" id="popup__avatar-link" className="popup__inputs" required
        placeholder="Ссылка на картинку" />
      <span className="popup__error popup__avatar-link-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;