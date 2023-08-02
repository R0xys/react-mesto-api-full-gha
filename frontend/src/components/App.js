import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup  from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute ";
import { Register } from "./Register";
import { Login } from "./Login";
import { SuccessInfoTooltip } from "./SuccessInfoTooltip";
import { FaultInfoTooltip } from "./FaultInfoTooltip";
import { mestoAuth } from "../utils/mestoAuth";
import { TopMenu } from "./TopMenu";

function App() {
  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
    setConfirmDeletePopupOpen(false);
    setSuccessTooltipPopupOpen(false);
    setFaultTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCardsList((cardsList) => cardsList.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => console.log(err))
    }
    else if (isLiked) {
      api.deleteLike(card._id)
      .then((newCard) => {
        setCardsList((cardsList) => cardsList.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCardsList((cardsList) => cardsList.filter(c => card !== c));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(newData) {
    api.updateUserApi(newData)
      .then(res=> {
        setCurrentUser({
          ...currentUser,
           name: res.name,
          about: res.about});
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(link) {
    api.updateAvatar(link)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          avatar: res.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(res => {
        setCardsList([res, ...cardsList]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleOpenConfirmDeletePopup(c) {
    setConfirmDeletePopupOpen(true);
    setDataConfirmDeletePopup(c);
  }

  const handleSignOut = () => {
    setLoggedIn(false);
    setBurgerMenuOpen(false);
    localStorage.removeItem("jwt");
  }

  const handleSignUp = (data) => {
    mestoAuth.signUp({
      "password": data.password,
      "email": data.username 
    })
      .then(() => {
        setSuccessTooltipPopupOpen(true);
        navigate("/sign-in", { replace: true })
      })
      .catch((err) => {
        setFaultTooltipPopupOpen(true);
        console.log(err)
      })
  }

  const handleSignIn = (data) => {
    mestoAuth.signIn({
      "password": data.password,
      "email": data.username 
    })
      .then(res => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/", {replace: true});
        setUserEmail(data.username);
      })
      .catch((err) => {
        setFaultTooltipPopupOpen(true);
        console.log(err)
      })
  }

  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      mestoAuth.checkToken(jwt)
        .then(res => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          navigate("/", {replace: true})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const changeStateBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  }

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [isSuccessTooltipPopupOpen, setSuccessTooltipPopupOpen] = React.useState(false);
  const [isFaultTooltipPopupOpen, setFaultTooltipPopupOpen] = React.useState(false);
  const [dataConfirmDeletePopup, setDataConfirmDeletePopup] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardsList, setCardsList] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [isBurgerMenuOpen, setBurgerMenuOpen] = React.useState(false);

  React.useEffect(() => {
    checkToken();
    Promise.all([api.getApiData("users/me"), api.getApiData("cards")])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCardsList(cardsData);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <CurrentUserContext.Provider value={{currentUser, cardsList}}>
      <div className="page__content">
        <Routes>
          <Route excat path="/" element={
          (
            <>
              <TopMenu isOpen={isBurgerMenuOpen} userEmail={userEmail} onSignOut={handleSignOut} />
              <Header>
                <nav className="header__nav-bar">
                  <p className="header__username">{userEmail}</p>
                  <Link className="header__link" onClick={handleSignOut}>Выйти</Link>
                </nav>
                <div onClick={changeStateBurgerMenu} className={`header__menu-burger ${isBurgerMenuOpen && "header__menu-burger_active"}`}>
                    <span></span>
                </div>
              </Header>
              <ProtectedRoute loggedIn={loggedIn} element={Main} onCardDelete={handleOpenConfirmDeletePopup} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike}/>
              <Footer />
            </>
          )} />
          <Route path="/sign-up" element={
          (
            <>
              <Header>
                <Link className="header__link" to="/sign-in">Войти</Link> 
              </Header>
              <Register onSignUp={handleSignUp} />
            </>
          )} />

          <Route path="/sign-in" element={
          (
            <>
              <Header>
                <Link className="header__link" to="/sign-up">Регистрация</Link>
              </Header>
              <Login onSignIn={handleSignIn} />
            </>
          )} />          
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
        </Routes>
        <SuccessInfoTooltip isOpen={isSuccessTooltipPopupOpen} onClose={closeAllPopups} />
        <FaultInfoTooltip isOpen={isFaultTooltipPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ConfirmDeletePopup onConfirm={handleCardDelete} onClose={closeAllPopups} isOpen={isConfirmDeletePopupOpen} card={dataConfirmDeletePopup} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
