import { Link } from "react-router-dom"

function Header({ children }) {
  return (
  <header className="header">
    <Link to="/" className="header__logo" replace></Link> 
    {children}
  </header>
  )
}

export default Header