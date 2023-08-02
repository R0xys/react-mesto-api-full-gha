import React from "react";

export const Login = (props) => {
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
    props.onSignIn(formValue);
  }

  return (
    <section className="auth">
    <h1 className="auth__title">Вход</h1>
    <form onSubmit={handleSubmit} action="#" name="login" className="auth__form" id={`${"login"}-form`}>
      <input type="email" onChange={handleChange} value={formValue.username} className="auth__input" placeholder="Email" required name="username"></input>
      <input type="password" onChange={handleChange} value={formValue.password} placeholder="Пароль" className="auth__input" required name="password"></input>
      <button type="submit" className="auth__button zero-button">Войти</button>
    </form>
  </section>
  )
}