import { closeModal } from "../../helpers/modals"
import "./modal.css"

export default (props: any) => {
  return (
    <div className="modal modal--closed" id="new-room-modal">
      <form className="modal__main" onSubmit={props.createExhibition}>
        <div className="modal__main__header">
          <h4>Exhibition Space</h4>
        </div>
        <div className="modal__main__body">
          <div className="modal__main__body__form">
            <div id="room-error" className="error hide">
              <p><b>Sorry, </b><span className="error-msg"></span></p>
            </div>

            <div className="input">
              <input type="text" id="exhibition-name" placeholder="Exhibition name" />
            </div>
          </div>
        </div>
        <div className="modal__main__footer flex">
          <button className="btn btn--primary margin--right-1">Create exhibition gallery</button>
          <button className="btn" type="button" onClick={() => closeModal('new-room')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}