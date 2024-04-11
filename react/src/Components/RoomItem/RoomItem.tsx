import { Link } from "react-router-dom"

import "./RoomItem.css"

export default (props: any) => {
  const imagePath = `/illustrations/room-one.png`

  return (
    <div className="room-item">
      <div className="room-item__background image--back" style={{ backgroundImage: `url("${imagePath}")` }}></div>
      <div className="room-item__details flex">
        <div className="room-items__details__desc">
          <p className="flex flex--j-space-between"><b>{props.name}</b></p>

          <div className="flex margin--top-1">
            <p className="room-items__details__view-room margin--right-2"><Link to={`/gallery?room=${props.uniqueId}`}><i className="fa-solid fa-arrow-up-right-from-square"></i> <span>Open</span></Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}