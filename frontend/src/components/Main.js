import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const {currentUser, cardsList} = React.useContext(CurrentUserContext);
  console.log();
  
  return (
  <main className="main">
    <section className="profile">
      <div className="profile__flex-wrapper">
        <div className="profile__avatar-wrapper">
          <div onClick={props.onEditAvatar} className="profile__avatar-cover"></div>
          <img src={currentUser.avatar} alt="Человек" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button zero-button" type="button"></button>
          </div>
          <p className="profile__caption">{currentUser.about}</p>
        </div>
      </div>
      <button onClick={props.onAddPlace} className="profile__add-button zero-button" type="button"></button>
    </section>
    <section className="grid-cards">
    {Array.from(cardsList).reverse().map((item) => (
        <Card key={item._id} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} onCardLike={props.onCardLike} card={item} />
      ))}
    </section>
  </main>
  )
}

export default Main