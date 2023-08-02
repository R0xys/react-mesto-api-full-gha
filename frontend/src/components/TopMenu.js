import { Link } from "react-router-dom"

export const TopMenu = (props) => {
  return (
    <section className={`top-menu ${props.isOpen && "top-menu_opened"}`}>
      <p className="top-menu__username">{props.userEmail}</p>
      <Link className="top-menu__link" onClick={props.onSignOut}>Выйти</Link>
    </section>
  )
}