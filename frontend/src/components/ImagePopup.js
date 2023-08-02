function ImagePopup(props) {
  return (
    <section className={`popup image-popup ${props.card.link === "" ? "" : "popup_opened"}`} id="image-popup">
      <div className="image-popup__container">
        <button onClick={props.onClose} className="image-popup__close-button zero-button" id="image-popup-close-button" type="button"></button>
        <img src={props.card.link} className="image-popup__picture" alt={props.card.name} />
        <p className="image-popup__caption">{props.card.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup