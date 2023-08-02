import React from "react"

function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`} id={name}>
      <div className="popup__container">
        <button onClick={onClose} className="popup__close-button zero-button" id={`${name}-close-button`} type="button"></button>
          <h2 className="popup__title">{title}</h2>
          <form action="#" onSubmit={onSubmit} method="post" name={name} className="popup__form" id={`${name}-form`}>
            {children}
            <button type="submit" className="popup__button popup__save-button zero-button" id={`${name}-submit-button`}>{buttonText}</button>
          </form>
      </div>
    </section>
  )
}

export default PopupWithForm 