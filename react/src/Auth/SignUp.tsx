import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postWithNoAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";
import { id } from "../helpers/string";

import "./auth.css";

export default () => {
  const [username, setUsername] = useState(null) as any;

  const nav = useNavigate();

  const localUserSignUp = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/sign-up', {
      fullname: getValueById('fullname'),
      username: id(getValueById('username')),
      email: id(getValueById('email-address')),
      password: getValueById('password'),
      passwordAgain: getValueById('password-again'),
    }, true)

    setUsername(res.username);

    // showError('auth', res.error)
  }

  useEffect(() => {
    if (username) nav(`/u/${username}`);;
  }, [username]);

  return (
    <div className="auth flex flex--a-center">
      <main className="auth__main">
        <form className="auth__main__form" onSubmit={localUserSignUp}>
          <img src="/logo/png/logo-no-background.png" alt="" />

          <div className="auth__main__form__header">
            <h1>Welcome back :)</h1>
            <p>Sign in to manage your artworks.</p>
          </div>
          <div className="auth__main__form__body">
            <div className="input">
              <input type="text" id="fullname" placeholder="Full name" />
            </div>

            <div className="input">
              <input type="text" id="username" placeholder="Username" />
            </div>

            <div className="input">
              <input type="email" id="email-address" placeholder="Email address" />
            </div>

            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>

            <div className="input">
              <input type="password" id="password-again" placeholder="Password again" />
            </div>

            <div className="flex flex--j-space-between">
              <p>Keep me signed in</p>
              <p>Forgot password?</p>
            </div>
            <button className="btn btn--primary margin--top-2">Sign up</button>
          </div>
          <div className="auth__main__form__footer">
            <p>Don't have an account? Sign up.</p>
          </div>
        </form>
      </main>
      <div className="auth__illustration image--back" style={{ backgroundImage: 'url("/illustrations/woman-1.jpg")' }}></div>
    </div>
  )
}