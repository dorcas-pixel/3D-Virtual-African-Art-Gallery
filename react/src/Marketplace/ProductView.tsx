import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BaseHeader from "../Components/Header/BaseHeader"
import Session from "../Auth/Session"

import "./Marketplace.css"
import { postWithAuth } from "../helpers/http";
import { BASEURL } from "../helpers/URL";
import { Popup } from "../Cart/Cart";

export default () => {
  console.log('Rendering Product');

  const [popupMsg, setPopupMsg] = useState('');
  const [artwork, setArtworks] = useState(null) as any;

  const { artworkId } = useParams()

  function clearPopup() {
    setPopupMsg('');
  }

  function addToCart(artworkId: string) {
    postWithAuth('/cart/add', {
      artworkId
    })

    setPopupMsg('Item added to cart');
  }

  async function getArtwork () {
    return postWithAuth('/works/get/one', {
      id: artworkId
    })
  }

  function getArtworkImage () {
    if (!artwork || artwork && !artwork.image) return '/illustrations/geo-1.jpg';

    return `${BASEURL()}/assets/uploads/artwork/${artwork.kind == 'model' ? 'thumbnails' : 'portraits'}/${artwork.image}`
  }

  useEffect(() => {
    (async () => {
      const res = await getArtwork()

      setArtworks(res.art);
    })()
  }, []);

  console.log(artwork?.room);
  

  return (
    <Session>
      <BaseHeader />

      { 
        !artwork ? (
          <p className="pos pos--center">Loading...</p>
        ) :
        (
          <div className="product-view flex">
            <div className="product-view__img">
              <img src={getArtworkImage()} alt="" />
            </div>
            <div className="product-view__details">
                <h1>{artwork.name}</h1>
              <p>by <b>{artwork.user.fullname}</b></p>
              <p>R{artwork.price}</p>

              <div className="flex margin--top-2">
                <button className="btn btn--primary margin--right-2" onClick={() => addToCart(artwork._id)}>Add to cart</button>
                {artwork.room && (<Link to={`/gallery?room=${artwork.room.uniqueId}`}><button className="btn">View in museum</button></Link>)}
              </div>

              <p className="margin--top-2"><b>Description</b></p>
              <p>{artwork.description}</p>
            </div>
          </div>
          
        )
      }

      {popupMsg && (
        <Popup clearPopup={clearPopup}>
          {popupMsg}
        </Popup>
      )}
      
    </Session>
  )
}