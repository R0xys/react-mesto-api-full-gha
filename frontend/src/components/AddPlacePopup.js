import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const inputNameRef = React.useRef();
  const inputLinkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value
    });
  }
  
  React.useEffect(() => {
    inputNameRef.current.value = "";
    inputLinkRef.current.value = "";
  }, [props.isOpen])

  return (
    <PopupWithForm buttonText="Создать" onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title="Новое место" name="card-popup" >
      <input ref={inputNameRef} type="text" minLength="2" maxLength="30" className="popup__input" placeholder="Название" required id="card-popup-input-title" name="input-title" />
      <span className="popup__error card-popup-input-title-error"></span>
      <input ref={inputLinkRef} type="url" className="popup__input" placeholder="Ссылка на картинку" required id="card-popup-input-src" name="input-src" />
      <span className="popup__error card-popup-input-src-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;