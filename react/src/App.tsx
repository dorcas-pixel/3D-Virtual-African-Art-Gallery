import Overview from "./Account/Overview"
import SignIn from "./Auth/SignIn"
import SignUp from "./Auth/SignUp"
import Gallery from "./Gallery/Gallery"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/u/:username" element={<Overview />}></Route>
      </Routes>
    </Router>
  )
}