import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {
  const {currentUser} = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }  

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="card">
      {isOwn && <button className="card__trash-button zero-button" type="button" onClick={handleDeleteClick}></button>}
      <img src={props.card.link} onClick={handleClick} className="card__image" alt={props.card.name}/>
      <div className="card__caption">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__wrapper">
          <button className={`card__like-button zero-button ${isLiked && "card__like-button_active"}`} onClick={handleLikeClick} type="button"></button>
          <p className="card__like-quantity">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card