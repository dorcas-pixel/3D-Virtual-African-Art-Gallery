import BaseHeader from "../Components/Header/BaseHeader"
import Session from "../Auth/Session"

import "./Home.css"
 
export default () => {
  return (
    <Session>
      <BaseHeader />
      <div className="home-showcase">
        <div className="home-showcase__background image--back" style={{ backgroundImage: 'url("/illustrations/geo-1.jpg")' }}></div>
        <div className="home-showcase__details pos--vertical">
          <h1>Define Your ART.</h1>
          <h1>We Host It</h1>
        </div>
      </div>
      <div className="home-title">
        <h4>Getting started</h4>
        <p>Create account to earn money with your ART</p>
      </div>
      <div className="home-gettings-started flex">
        <div className="home-gettings-started__item flex">
          <div className="home-gettings-started__item__icon margin--right-2">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="home-gettings-started__item__details">
            <p><b>Create an account</b></p>
            <p>Get started by creating an account or logging in</p>
          </div>
        </div>

        <div className="home-gettings-started__item flex">
          <div className="home-gettings-started__item__icon margin--right-2">
            <i className="fa-solid fa-credit-card"></i>
          </div>
          <div className="home-gettings-started__item__details">
            <p><b>Create an account</b></p>
            <p>Get started by creating an account or logging in</p>
          </div>
        </div>

        <div className="home-gettings-started__item flex">
          <div className="home-gettings-started__item__icon margin--right-2">
            <i className="fa-solid fa-paint-brush"></i>
          </div>
          <div className="home-gettings-started__item__details">
            <p><b>Upload artwork</b></p>
            <p>Upload 2D artwork or 3D models to sell</p>
          </div>
        </div>
        <div className="home-gettings-started__item flex">
          <div className="home-gettings-started__item__icon margin--right-2">
            <i className="fa-solid fa-receipt"></i>
          </div>
          <div className="home-gettings-started__item__details">
            <p><b>Make money from marketplace</b></p>
            <p>Upload 2D artwork or 3D models to sell</p>
          </div>
        </div>
      </div>
      <div className="home-title">
        <h4>Explore styles</h4>
        <p>Enjoy both 2D paintings are 3D models of AFRIKA</p>
      </div>
      <div className="home-cards flex flex--j-center">
        <div className="home-cards__item">
          <div className="home-cards__item__back image--back" style={{ backgroundImage: 'url("/illustrations/wire-african-woman-model.jpg")' }}></div>
          <div className="home-cards__item__description">
            <h4>3D Sculptures</h4>
            <p>This is just a test description, ignore it</p>
          </div>
        </div>

        <div className="home-cards__item">
          <div className="home-cards__item__back image--back" style={{ backgroundImage: 'url("/illustrations/wire-african-woman-painting.jpg")' }}></div>
          <div className="home-cards__item__description">
            <h4>Paintings</h4>
            <p>This is just a test description, ignore it</p>
          </div>
        </div>
      </div>
    </Session>
  )
}