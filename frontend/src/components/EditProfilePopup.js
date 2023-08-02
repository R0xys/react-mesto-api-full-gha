import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const{ currentUser } = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [props.isOpen]); 

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохрнаить" title="Редактировать профиль" name="profile-popup">
      <input onChange={handleChangeName} value={name} type="text" minLength="2" maxLength="40" required className="popup__input" id="profile-popup-input-name" name="input-name" />
      <span className="popup__error profile-popup-input-name-error"></span>
      <input onChange={handleChangeDescription} value={description} type="text" minLength="2" maxLength="200" required className="popup__input" id="profile-popup-input-job" name="input-job" />
      <span className="popup__error profile-popup-input-job-error"></span>
    </PopupWithForm> 
  )
}

export default EditProfilePopup;