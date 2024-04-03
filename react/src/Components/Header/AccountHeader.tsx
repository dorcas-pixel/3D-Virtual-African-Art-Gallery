import { useContext } from "react";
import { AuthContext } from "../../Auth/Authenticator";
import { Link, useNavigate } from "react-router-dom";
import "./header.css"
import { postWithAuth } from "../../helpers/http";

export default () => {
  const {user} = useContext(AuthContext);
  const nav = useNavigate();

  const signOut = () => {

    postWithAuth('/sign-out', {}, true)

    nav('/sign-in');
  }

  return (
    <header className="header flex flex--a-center flex--j-space-between">
      <img src="/logo/png/logo-no-background.png" alt="logo" className="header__logo" />
      <nav className="header__nav">
        <ul className="header__nav__ul flex flex--a-center">
          <li className="hover"><b><Link to="/">Home</Link></b></li>
          <li className="hover"><Link to="/marketplace">Marketplace</Link></li>
          <li className="hover"><Link to="/gallery">Gallery</Link></li>
          <li className="hover"><Link to={`/u/${user.username}`}>Profile</Link></li>
          <li className="hover"><Link to={`/u/${user.username}/cart`}>Cart</Link></li>
          <li className="hover"><Link to={`/u/${user.username}/orders`}>Orders</Link></li>
          <li className="hover" onClick={signOut}>Sign out</li>
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