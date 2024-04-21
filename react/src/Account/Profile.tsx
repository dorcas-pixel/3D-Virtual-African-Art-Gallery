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
import { showError } from "../helpers/error"

export default () => {
  console.log('Rendering Profile');

  const nav = useNavigate();

  async function updateUserInfo (e: any) {
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

    else if (res.error) showError('update', res.error);
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

          <UserForm updateUserInfo={updateUserInfo} />
        </div>
      </main>
    </Authenticator>
  )
}

function UserForm (props: any) {
  const { user } = useContext(AuthContext);

  return (
    <form onSubmit={props.updateUserInfo}>
      <div id="update-error" className="error hide">
        <p><b>Sorry, </b><span className="error-msg"></span></p>
      </div>
      <div className="input">
        <input type="text" id="fullname" placeholder="Full name" defaultValue={user?.fullname} />
      </div>

      <div className="input margin--top-1">
        <input type="text" id="username" placeholder="Username" defaultValue={user?.username} />
      </div>

      <div className="input margin--top-1">
        <input type="email" id="email-address" placeholder="Email address" defaultValue={user?.email} />
      </div>

      <button className="btn btn--primary margin--top-2">Update details</button>
    </form>
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