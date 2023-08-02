import React from "react";

function ConfirmDeletePopup(props) {
  function handleClick() {
    props.onConfirm(props.card);
  }
  return (
    <section className={`popup ${props.isOpen && "popup_opened"}`} id="confirm-popup">
      <div className="popup__container">
        <button onClick={props.onClose} className="popup__close-button zero-button" id="confirm-popup-close-button" type="button"></button>
          <h2 className="popup__title popup__confirm-title">Вы уверены?</h2>
          <button onClick={handleClick} type="button" className="popup__confirm-button zero-button">Да</button>
      </div>
    </section>
  )
}

export default ConfirmDeletePopup;