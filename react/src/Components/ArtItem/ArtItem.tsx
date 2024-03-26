import { Link } from "react-router-dom"
import { postWithAuth } from "../../helpers/http"
import "./artItem.css"

export default (props: any) => {
  const imagePath = `/assets/uploads/artwork/${props.kind == 'model' ? 'thumbnails' : 'portraits'}/${props.image}`

  function addToCart(artworkId: string) {
    postWithAuth('/cart/add', {
      artworkId
    })

    props.setPopupMessage('Item added to cart');
  }

  return (
    <div className="art-item">
      <div className="art-item__background image--back" style={{ backgroundImage: `url("${imagePath}")` }}></div>
      <div className="art-item__details flex">
        <div className="art-item__details__profile image--back image--round" style={{backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")'}}></div>
        <div className="art-items__details__desc">
          <p className="flex flex--j-space-between"><b>{props.name}</b> <span>R{props.price}</span></p>
          <p>{props.user.fullname}</p>

          <div className="flex margin--top-1">
            <p className="margin--right-2"><Link to={`/marketplace/${props._id}`}><i className="fa-solid fa-circle-question"></i> <span>See more</span></Link></p>
            {!props.inProfile && (<p onClick={() => addToCart(props._id)}><i className="fa-solid fa-cart-plus"></i> <span>Add to cart</span></p>)}
          </div>
        </div>
      </div>
    </div>
  )
}