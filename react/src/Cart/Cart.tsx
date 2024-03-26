import BaseHeader from "../Components/Header/BaseHeader"
import Session from "../Auth/Session"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";

import "./Cart.css"
import { SERVERURL } from "../helpers/URL";

export const Popup = (props: any) => {
  setTimeout(() => props.clearPopup(), 3000)

  return (
    <div className="cart-popup">
      <p><i className="fa-solid fa-cart-shopping margin--right-1"></i>{props.children}</p>
      <Link to="/cart" className="margin--top-1" style={{display: 'block'}}>See cart</Link>
    </div>
  )
}

export default () => {
  const [works, setWorks] = useState([]);

  async function getCartItems () {
    return postWithAuth('/cart/get/by/user', {})
  }

  async function removeItem (itemId: string) {
    await postWithAuth('/cart/remove', {itemId})

    await setCartItems()
  }

  async function setCartItems () {
    const res = await getCartItems();

    setWorks(res.works);
  }

  useEffect(() => {
    (async () => {
      await setCartItems()
    })()
  }, []);

  return (
    <Session>
      <BaseHeader />
      <div className="cart">
        <h1 className="cart__title">Your Cart.</h1>
        <div style={{ margin: '2rem 16% 0' }}>
          <table className="cart__list">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {works?.map((item: any) => (
                <tr key={item._id}>
                  <td>
                    <span className="flex flex--a-center">
                      <span className="cart__list__image image--back margin--right-1" style={{backgroundImage: `url("${SERVERURL}/assets/uploads/artwork/portraits/${item.artwork.image}")`}}></span>
                      <span>
                        <b>{item.artwork.name}</b><br />
                        <span onClick={() => removeItem(item._id)}>remove</span>
                      </span>
                    </span>
                  </td>
                  <td>1</td>
                  <td>R{item.artwork.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="cart__list">
          <div className="cart__list__item flex flex--a-center flex--j-space-between">
            <div>
              <p><b>Item</b></p>
            </div>
            <div>
              <p><b>Quantity</b></p>
            </div>
            <div>
              <p><b>Price</b></p>
            </div>
          </div>
          {works?.map((item: any) => (
            <div className="cart__list__item flex flex--a-center flex--j-space-between">
              <div>
                <p><b></b></p>
                <p>remove</p>
              </div>
              <div>
                1
              </div>
              <div>
                R400
              </div>
            </div>
          ))}
        </div> */}
        <div className="cart__buttons margin--top-2">
          <button className="btn btn--primary margin--right-2">Check out</button>
          <button className="btn">Clear</button>
        </div>
      </div>
    </Session>
  )
}