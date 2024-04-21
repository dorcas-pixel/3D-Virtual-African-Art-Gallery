import { useContext } from "react"

import AccountHeader from "../Components/Header/AccountHeader"
import Authenticator, { AuthContext } from "../Auth/Authenticator"

import "./account.css"
import { postWithAuth, postWithAxios, rememberUser } from "../helpers/http"
import { getValueById } from "../helpers/dom"
import { id } from "../helpers/string"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../helpers/URL"
import { addInputFile } from "../helpers/inputs"

export default () => {
  console.log('Rendering Profile');

  const nav = useNavigate();

  async function updateUserInfo(e: any) {
    e.preventDefault();

    const res = await postWithAuth('/user/update/details', {
      fullname: getValueById('fullname'),
      username: id(getValueById('username')),
      email: id(getValueById('email-address'))
    }, true)

    rememberUser(res.user);

    if (res.user) {
      nav(`/u/${res.user.username}/profile`)

      window.location.reload();
    }
  }

  return (
    <Authenticator sameUser={true}>
      <AccountHeader />
      <main className="account flex flex--a-start">
        <UserOverview />
        <div className="account__profile">
          <div className="account__title">
            <h1>My Profile</h1>
            <p>Edit details</p>
          </div>

          <form onSubmit={updateUserInfo}>
            <div className="input">
              <input type="text" id="fullname" placeholder="Full name" />
            </div>

            <div className="input margin--top-1">
              <input type="text" id="username" placeholder="Username" />
            </div>

            <div className="input margin--top-1">
              <input type="email" id="email-address" placeholder="Email address" />
            </div>

            <button className="btn btn--primary margin--top-2">Update details</button>
          </form>
        </div>
      </main>
    </Authenticator>
  )
}

export function UserOverview() {
  const { user } = useContext(AuthContext);

  const updateProfile = async () => {
    const data = addInputFile('profile-file', 'profile');

    await postWithAxios(`/user/update/profile`, data, {
      credentials: true
    })

    window.location.reload();
  }

  return (
    <div className="account__user flex">
      <div className="account__user__profile image--back image--round" id="profile-background" style={{ backgroundImage: `url("${BASEURL()}/assets/uploads/profile/${user.picture}")` }}></div>
      <h2 className="account__user__name">{user.fullname}</h2>
      <p>Artist</p>
      <label className="btn btn--primary margin--top-1" style={{ display: 'block' }} htmlFor="profile-file">Change photo</label>
      <input type="file" id="profile-file" onChange={updateProfile} hidden />
    </div>
  )
}