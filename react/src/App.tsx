import Overview from "./Account/Overview"
import Orders from "./Account/Orders"
import Rooms from "./Account/Exhibitions"
import SignIn from "./Auth/SignIn"
import SignUp from "./Auth/SignUp"
import Gallery from "./Gallery/Gallery"
import Marketplace from "./Marketplace/Marketplace"
import ProductView from "./Marketplace/ProductView"
import Cart from "./Cart/Cart"
import Checkout from "./Cart/Checkout"
import CheckoutSuccess from "./Cart/CheckoutSuccess"
import Home from "./Home/Home"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/marketplace" element={<Marketplace />}></Route>
        <Route path="/marketplace/:artworkId" element={<ProductView />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/checkout/success" element={<CheckoutSuccess />}></Route>
        <Route path="/u/:username" element={<Overview />}></Route>
        <Route path="/u/:username/cart" element={<Cart />}></Route>
        <Route path="/u/:username/orders" element={<Orders />}></Route>
        <Route path="/u/:username/spaces" element={<Rooms />}></Route>
      </Routes>
    </Router>
  )
}