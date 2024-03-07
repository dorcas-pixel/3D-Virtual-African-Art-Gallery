import { useContext } from "react";
import { AuthContext } from "../../Auth/Authenticator";
import "./header.css"

export default () => {
  const {user} = useContext(AuthContext);

  return (
    <header className="header flex flex--j-space-between">
      <img src="/logo/png/logo-no-background.png" alt="logo" className="header__logo" />
      <div className="header__user flex flex--a-center">
        <p className="margin--right-2">
          <p><b>{user.fullname}</b></p>
          <span>@{user.username}</span>
        </p>
        <div className="header__user__profile image--back image--round" style={{backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")'}}></div>
      </div>
    </header>
  )
}