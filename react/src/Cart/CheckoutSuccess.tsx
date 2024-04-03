import { useContext } from "react"
import { Link } from "react-router-dom";
import Authenticator, { AuthContext } from "../Auth/Authenticator"

import "./Cart.css";

export default () => {

  return (
    <Authenticator>
      <Message />
    </Authenticator>
  )
}

function Message () {
  const { user } = useContext(AuthContext);

  return (
    <div className="checkout-msg">
      <h1>Thank you</h1>
      <p>Your purchase has been successful</p>
      <p>Please check your orders <span style={{ color: '#1e00ff' }}><Link to={`/u/${user.username}/orders`}>here</Link></span></p>
      <button className="margin--top-2 btn btn--primary">Go home</button>
    </div>
  )
}