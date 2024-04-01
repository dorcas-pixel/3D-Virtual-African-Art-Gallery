import { useContext } from "react";
import { AuthContext } from "../../Auth/Session";
import { Link } from "react-router-dom";

import "./header.css"

export default () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header flex flex--a-center flex--j-space-between">
      <img src="/logo/png/logo-no-background.png" alt="logo" className="header__logo" />
      <nav className="header__nav">
        <ul className="header__nav__ul flex flex--a-center">
          <li><b><Link to="/">Home</Link></b></li>
          <li><Link to="/marketplace">Martketplace</Link></li>

          {user ?
            (
              <>
                <li><Link to={`/u/${user.username}`}>Profile</Link></li>
                <li><Link to={`/u/${user.username}/cart`}>Cart</Link></li>
                <li><Link to={`/u/${user.username}/orders`}>Orders</Link></li>
              </>
            ) :
            <></>
          }
        </ul>
      </nav>
      <div className="header__user flex flex--a-center">
        {user ? 
          (
          <>
            <p className="margin--right-2">
              <span><b>{user.fullname}</b></span><br />
              <span>@{user.username}</span>
            </p>
            <div className="header__user__profile image--back image--round" style={{ backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")' }}></div>
          </>
          ) : 
          (
            <div className="flex">
              <Link to="/sign-in" className="btn btn--primary margin--right-1">Sign in</Link>
              <Link to="/sign-up" className="btn">Sign up</Link>
            </div>
          )
        }
      </div>
    </header>
  )
}