import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }
  
  React.useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen])

  return(
    <PopupWithForm onSubmit={handleSubmit} buttonText="Сохрнаить" onClose={props.onClose} isOpen={props.isOpen} title="Обновить аватар" name="avatar-popup">
      <input ref={inputRef} type="url" className="popup__input" placeholder="Ссылка на картинку" required id="avatar-popup-input-src" name="input-src" />
      <span className="popup__error avatar-popup-input-src-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;