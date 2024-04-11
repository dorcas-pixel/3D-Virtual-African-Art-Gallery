import { useContext, useEffect, useState } from "react"

import AccountHeader from "../Components/Header/AccountHeader"
import Authenticator, { AuthContext } from "../Auth/Authenticator"

import "./account.css"
import { postWithAuth } from "../helpers/http"
import { formatTime } from "../helpers/date"

export default () => {
  console.log('Rendering Orders');

  const [orders, setOrders] = useState([]) as any;
  const [sellers, setSellers] = useState(new Map()) as any;

  async function getByUser () {
    const res = await postWithAuth('/orders/get/by/buyer', {})

    mapArtists(res.orders)

    setOrders(res.orders)
  }

  function mapArtists (orders: Array<any>) {
    orders.forEach((order: any) => {
      order.sellers.forEach((seller: any) => {
        sellers.set(seller._id, seller)

        setSellers(new Map(sellers.entries()))
      });
    });
  }

  const seller = (id: string) => {
    let artist = sellers.get(id);

    if (!artist) return {
      fullname: 'Unknwon Artist'
    }

    return artist;
  }
 
  useEffect(() => {
    (async () => {
      getByUser()
    })()
  }, [])

  return (
    <Authenticator sameUser={true}>
      <AccountHeader />
      <main className="account flex flex--a-start">
        <UserOverview />
        <div className="account__works">
          <div className="account__title">
            <h1>Orders</h1>
            <p>Artworks you bought from other artists</p>
          </div>

          <table className="cart__list" style={{marginTop: '4rem'}}>
            <thead>
              <tr>
                <th>Artworks</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Ordered on</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any) => (
                <tr key={order._id}>
                  <td>
                    {order.artworks?.map((arwork: any) => (
                      <>
                        <p><b>{arwork.name}</b></p>
                        <p style={{marginBottom: '1rem'}}>{seller(arwork.user).fullname}</p>
                      </>
                    ))}
                  </td>
                  <td>R{order.cost}</td>
                  <td>{order.status}</td>
                  <td>{formatTime(new Date(order.createdAt))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Authenticator>
  )
}

function UserOverview() {
  const { user } = useContext(AuthContext);

  return (
    <div className="account__user flex">
      <div className="account__user__profile image--back image--round" style={{ backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")' }}></div>
      <h2 className="account__user__name">{user.fullname}</h2>
      <p>Artist</p>
      <button className="btn btn--primary">Edit profile</button>
    </div>
  )
}