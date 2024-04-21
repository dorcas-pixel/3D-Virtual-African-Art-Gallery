import { useContext } from "react";
import { AuthContext } from "../../Auth/Session";
import { Link, useNavigate } from "react-router-dom";
import { postWithAuth } from "../../helpers/http";

import "./header.css"
import { BASEURL } from "../../helpers/URL";

export default () => {
  const { user } = useContext(AuthContext);
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

          {user ?
            (
              <>
                <li className="hover"><Link to={`/u/${user.username}`}>Profile</Link></li>
                <li className="hover"><Link to={`/u/${user.username}/cart`}>Cart</Link></li>
                <li className="hover"><Link to={`/u/${user.username}/orders`}>Orders</Link></li>
                <li className="hover" onClick={signOut}>Sign out</li>
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
              <div className="header__user__profile image--back image--round" style={{ backgroundImage: `url("${BASEURL()}/assets/uploads/profile/${user.picture}")` }}></div>
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