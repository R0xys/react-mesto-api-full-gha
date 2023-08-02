import { Link } from "react-router-dom";
import React from "react";

export const Register = (props) => {
  const [formValue, setformValue] = React.useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSignUp(formValue)
  }
  
  return (
    <section className="auth">
      <h1 className="auth__title">Регистрация</h1>
      <form onSubmit={handleSubmit} action="#" name="register" className="auth__form" id={`${"register"}-form`}>
        <input type="email" onChange={handleChange} value={formValue.username} className="auth__input" placeholder="Email" required name="username"></input>
        <input type="password" onChange={handleChange} value={formValue.password} placeholder="Пароль" className="auth__input" required name="password"></input>
        <button type="submit" className="auth__button zero-button">Зарегистрироваться</button>
      </form>
      <p className="auth__caption">Уже зарегистрированы? <Link to="/sign-in" className="auth__link" replace>Войти</Link></p>
    </section>
  )
}