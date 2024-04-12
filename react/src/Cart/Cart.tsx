import BaseHeader from "../Components/Header/BaseHeader"
import Session from "../Auth/Session"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postWithAuth } from "../helpers/http";
import { BASEURL } from "../helpers/URL";

import "./Cart.css"

export const Popup = (props: any) => {
  console.log('Rendering Cart');

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

  async function clearCart () {
    await postWithAuth('/cart/remove/all', { })

    await setCartItems();
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
                      <span className="cart__list__image image--back margin--right-1" style={{backgroundImage: `url("${BASEURL()}/assets/uploads/artwork/${item.artwork.kind == 'portrait' ? 'portraits' : 'thumbnails'}/${item.artwork.image}")`}}></span>
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
        <div className="cart__buttons margin--top-2">
          <Link to="/checkout" className="btn btn--primary margin--right-2">Check out</Link>
          <button className="btn" onClick={clearCart}>Clear</button>
        </div>
      </div>
    </Session>
  )
}