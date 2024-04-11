import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import AccountHeader from "../Components/Header/AccountHeader"
import Room from "../Components/Modal/Exhibition"
import Authenticator from "../Auth/Authenticator"
import { getUserBySession, getUserByUsername, postWithAuth } from "../helpers/http"
import { closeModal, openModal } from "../helpers/modals"
import { getValueById } from "../helpers/dom"

import "./account.css"
import RoomItem from "../Components/RoomItem/RoomItem"
import { UserOverview } from "./Overview"

export default () => {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(null) as any;
  const [currentUser, setCurrentUser] = useState(null) as any;

  const {username} = useParams()

  async function createExhibition (e: any) {
    e.preventDefault();

    await postWithAuth('/rooms/add', {
      name: getValueById('exhibition-name')
    })

    setRooms(await getRoomsByUsername())

    closeModal('new-room')
  }

  async function getRoomsByUsername() {
    const res = await postWithAuth('/rooms/get/by/username', {
      username 
    })

    return res.rooms;
  }

  useEffect(() => {
    (async () => {
      setRooms(await getRoomsByUsername())
      setUser(await getUserBySession())
      setCurrentUser(await getUserByUsername(username))
    })();
  }, [])

  return (
    <Authenticator>
      <AccountHeader />
      <main className="account flex flex--a-start">
        <UserOverview />
        <div className="account__rooms">
          <div className="account__title">
            <h1>My Exhibition Spaces</h1>
            <p>Rooms for displaying yout portraits</p>
          </div>

          <div className="flex flex--a-center">
            <ul className="account__works__tabs flex">
              <li className="btn"><Link to={`/u/${username}`}>All</Link></li>
              <li className="btn"><Link to={`/u/${username}?kind=model`}>Models</Link></li>
              <li className="btn"><Link to={`/u/${username}?kind=portrait`}>Portraits</Link></li>
            </ul>
            <div style={{ width: '1px', height: '3rem', backgroundColor: '#999', margin: '0 2rem' }}></div>
            <p><Link className="color" to={`/u/${username}/spaces`}>Exhibition spaces</Link></p>
          </div>

          <div className="account__rooms__list">
            {rooms?.map((room: any) => (<RoomItem key={room._id} {...room}/>))}

            {
              user && currentUser && user.email == currentUser.email ? (
                <div className="account__rooms__add flex flex--center" style={{ flexDirection: "row" }}>
                  <div className="flex flex--a-center hover" style={{ flex: '1', flexDirection: 'column' }} onClick={() => openModal('new-room')}>
                    <svg className="image--icon">
                      <use href="#add"></use>
                    </svg>
                    <p>Add exhibition space</p>
                  </div>
                </div>
              ) : (<></>)
            }
          </div>
        </div>

        <Room createExhibition={createExhibition}/>
      </main>
    </Authenticator>
  )
}