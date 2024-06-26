import { Link } from "react-router-dom"
import { postWithAuth } from "../../helpers/http"
import { BASEURL } from "../../helpers/URL"
import "./artItem.css"

export default (props: any) => {
  const imagePath = `${BASEURL()}/assets/uploads/artwork/${props.kind == 'model' ? 'thumbnails' : 'portraits'}/${props.image}`

  function addToCart(artworkId: string) {
    postWithAuth('/cart/add', {
      artworkId
    })

    props.setPopupMessage('Item added to cart');
  }

  return (
    <div className="art-item">
      <div className="art-item__background image--back" style={{ backgroundImage: `url("${imagePath}")` }}>
        {
          props.isOwner && props.inProfile && (<div className="art-item__details__remove hover" onClick={() => props.removeArtwork(props._id)}>
            <i className="pos--abs pos--center fa-regular fa-trash-can"  style={{ color: '#770000' }}></i>
          </div>)
        }
      </div>
      <div className="art-item__details flex">
        <div className="art-item__details__profile image--back image--round" style={{ backgroundImage: `url("${BASEURL()}/assets/uploads/profile/${props.user.picture}")`}}>
          
        </div>
        <div className="art-items__details__desc">
          <p className="flex flex--j-space-between"><b>{props.name}</b> <span>R{props.price}</span></p>
          <p>{props.user.fullname}</p>

          <div className="flex margin--top-1">
            <p className="art-items__details__view-art margin--right-2"><Link to={`/marketplace/${props._id}`}><i className="fa-solid fa-circle-question"></i> <span>See more</span></Link></p>
            {!props.inProfile && (<p className="art-items__details__cart margin--right-2" onClick={() => addToCart(props._id)}><i className="fa-solid fa-cart-plus"></i> <span>Add to cart</span></p>)}
            {props.kind == 'model' && (<p className="hover" onClick={props.openIn3D}><i className="fa-solid fa-cube margin--right-1"></i>View in 3D</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}