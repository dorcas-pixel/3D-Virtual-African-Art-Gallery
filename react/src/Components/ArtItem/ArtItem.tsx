import { SERVERURL } from "../../helpers/URL"
import "./artItem.css"

export default (props: any) => {
  const imagePath = SERVERURL + '/assets/uploads/artwork/portraits/' + props.image

  return (
    <div className="art-item">
      <div className="art-item__background image--back" style={{ backgroundImage: `url("${imagePath}")` }}></div>
      <div className="art-item__details flex">
        <div className="art-item__details__profile image--back image--round" style={{backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")'}}></div>
        <div className="art-items__details__desc">
          <p><b>{props.name}</b></p>
          <p>You</p>
        </div>
      </div>
    </div>
  )
}