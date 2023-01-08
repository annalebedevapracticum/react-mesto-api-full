import React from "react";
import editbutton from '../images/editbutton.svg';
import vector2 from '../images/Vector2.svg';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, setSelectedCard, cards, onCardLike, onCardDelete }) {
    const { currentUser } = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
                    <img className="profile__avatar" alt="Аватар" src={currentUser.avatar} />
                </div>
                <div className="profile__info">
                    <div className="profile__row">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button"><img className="profile__edit-image"
                            alt="Изменить" src={editbutton} onClick={onEditProfile} /></button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}><img className="profile__plus" alt="Добавить"
                    src={vector2} /></button>
            </section>
            <section className="cards">
                {cards.map((card) => {
                    const { _id, ...props } = card;
                    return <Card key={_id} {...props} onImageClick={setSelectedCard} onCardLike={() => onCardLike(card)} onCardDelete={() => onCardDelete(card)} />
                })}
            </section>
        </main>
    )
}

export default Main;