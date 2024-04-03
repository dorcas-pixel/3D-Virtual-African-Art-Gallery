import { closeModal } from "../../helpers/modals"
import "./modal.css"

export default (props: any) => {
  return (
    <div className="modal modal--closed" id="new-portrait-modal">
      <form className="modal__main" onSubmit={props.uploadPortraitDetails}>
        <div className="modal__main__header">
          <h4>Upload portrait</h4>
        </div>
        <div className="modal__main__body flex">
          <div className="model__main__body__preview pos--rel margin--right-1 ">
            <div
              className="image--back"
              id="portrait-preview"
              style={{ backgroundImage: "url('/illustrations/geo-1.jpg')", filter: 'opacity(0.5)', height: '15rem', borderRadius: '5px' }}>
            </div>
            <label className="pos--center hover" htmlFor="portrait-file">Click to add Portrait</label>
            <input type="file" id="portrait-file" onChange={props.uploadPortrait} hidden />
          </div>

          <div className="model__main__body__form">
            <div id="portrait-error" className="error hide">
              <p><b>Sorry, </b><span className="error-msg"></span></p>
            </div>

            <div className="input">
              <input type="text" id="portrait-name" placeholder="Portrait name" />
            </div>

            <div className="input margin--top-1">
              <input type="text" id="portrait-price" placeholder="Portrait price (in rands)" />
            </div>

            <div className="input margin--top-1">
              <textarea name="" id="portrait-description" placeholder="Portrait description"></textarea>
            </div>
          </div>
        </div>
        <div className="modal__main__footer flex">
          <button className="btn btn--primary margin--right-1">Add Portrait</button>
          <button className="btn" onClick={() => closeModal('new-portrait')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}