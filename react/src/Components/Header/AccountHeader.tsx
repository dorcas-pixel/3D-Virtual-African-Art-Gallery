import { useContext } from "react";
import { AuthContext } from "../../Auth/Authenticator";
import "./header.css"
import { Link } from "react-router-dom";

export default () => {
  const {user} = useContext(AuthContext);

  return (
    <header className="header flex flex--a-center flex--j-space-between">
      <img src="/logo/png/logo-no-background.png" alt="logo" className="header__logo" />
      <nav className="header__nav">
        <ul className="header__nav__ul flex flex--a-center">
          <li><b><Link to="/">Home</Link></b></li>
          <li><Link to="/marketplace">Martketplace</Link></li>
          <li><Link to={`/u/${user.username}`}>Profile</Link></li>
          <li><Link to={`/u/${user.username}/cart`}>Cart</Link></li>
          <li><Link to={`/u/${user.username}/orders`}>Orders</Link></li>
        </ul>
      </nav>
      <div className="header__user flex flex--a-center">
        <p className="margin--right-2">
          <span><b>{user.fullname}</b></span><br/>
          <span>@{user.username}</span>
        </p>
        <div className="header__user__profile image--back image--round" style={{backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")'}}></div>
      </div>
    </header>
  )
}