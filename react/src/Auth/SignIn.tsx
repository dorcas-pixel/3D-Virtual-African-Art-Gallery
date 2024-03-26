import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postWithNoAuth } from "../helpers/http";
import { getValueById } from "../helpers/dom";

import "./Auth.css"

export default () => {
  const [username, setUsername] = useState(null) as any;

  const nav = useNavigate();

  const localUserSignIn = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithNoAuth('/sign-in', {
      identifier: getValueById('identifier'),
      password: getValueById('password')
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
        <form className="auth__main__form" onSubmit={localUserSignIn}>
          <img src="/logo/png/logo-no-background.png" alt="" />

          <div className="auth__main__form__header">
            <h1>Welcome back :)</h1>
            <p>Sign in to manage your artworks.</p>
          </div>
          <div className="auth__main__form__body">
            <div className="input">
              <input type="text" id="identifier" placeholder="Email address or Username" />
            </div>

            <div className="input">
              <input type="password" id="password" placeholder="Password" />
            </div>

            <div className="flex flex--j-space-between">
              <p>Keep me signed in</p>
              <p>Forgot password?</p>
            </div>
            <button className="btn btn--primary margin--top-2">Sign in</button>
          </div>
          <div className="auth__main__form__footer">
            <p>Don't have an account? <Link to="/sign-up">Sign up.</Link></p>
          </div>
        </form>
      </main>
      <div className="auth__illustration image--back" style={{ backgroundImage: 'url("/illustrations/woman-1.jpg")' }}></div>
    </div>
  )
}