import { Link } from "react-router-dom"
import Session from "../Auth/Session"
import BaseHeader from "../Components/Header/BaseHeader"

export default () => {
  return (
    <Session>
      <BaseHeader />
      <div className="account-not-found">
        <img src="/illustrations/empty.svg" alt="" />
        <h4>Page Not Found</h4>
        <p>The page you are looking for could not be found, please ensure that the url is correct.</p>
        <p style={{ color: '#ff6161' }}><Link to="/">Go home</Link></p>
      </div>
    </Session>
  )
}