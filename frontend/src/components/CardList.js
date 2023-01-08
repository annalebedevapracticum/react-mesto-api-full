import { useEffect, useState } from "react";
import Main from "./Main";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { apiInstance } from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

function CardList() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiInstance.getUserInfo().then(setCurrentUser)
      .catch((error) => console.log(`Ошибка: ${error}`));
  }, [])

  useEffect(() => {
    apiInstance.getCardsInfo().then((data) => {
      setCards(data);
    }).catch((error) => console.log(`Ошибка: ${error}`))
  }, [])

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard(null)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    return apiInstance.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardDeleteClick(card) {
    setCardForDelete(card);
    setIsConfirmationPopupOpen(true);
  }

  function handleCardDelete(card) {
    return apiInstance.removeCard(card._id).then(() => {
      setCards(cards.filter(c => c._id !== card._id));
    })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const handleConfirmationSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleCardDelete(cardForDelete).then(() => {
      closeAllPopups();
      setCardForDelete(null);
      setLoading(false);
    });
  }

  const handleUpdateUser = ({ name, about }) => {
    setLoading(true);
    return apiInstance.updateProfileInfo(name, about)
      .then(info => {
        setCurrentUser(info);
        setLoading(false);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const handleUpdateAvatar = ({ avatar }) => {
    setLoading(true);
    return apiInstance.updateAvatar(avatar).then(info => {
      setCurrentUser(info);
      setLoading(false);
      closeAllPopups();
    })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    setLoading(true);
    return apiInstance.addCard(name, link).then(newCard => {
      setCards([newCard, ...cards]);
      setLoading(false);
      closeAllPopups();
    })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      loading
    }}>
      <Main onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        closeAllPopups={closeAllPopups}
        setSelectedCard={setSelectedCard}
        cards={cards}
        onCardDelete={handleCardDeleteClick}
        onCardLike={handleCardLike}
      />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <ImagePopup isOpen={!!selectedCard} onClose={closeAllPopups} selectedCard={selectedCard} />
      <PopupWithForm name='confirmation' title='Вы уверены?' isOpen={isConfirmationPopupOpen} onClose={closeAllPopups} submitText="Да" onSubmit={handleConfirmationSubmit} isLoading={loading} />
    </CurrentUserContext.Provider>
  );
}

export default CardList;
