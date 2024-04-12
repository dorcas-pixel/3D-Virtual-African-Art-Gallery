import { closeModal } from "../../helpers/modals"
import "./modal.css"

export default (props: any) => {
  return (
    <div className="modal modal--closed" id="new-model-modal">
      <form className="modal__main" onSubmit={props.uploadModelDetails}>
        <div className="modal__main__header">
          <h4>Upload Model</h4>
        </div>
        <div className="modal__main__body flex">
          <div className="model__main__body__preview pos--rel margin--right-1 ">
            <div
              className="image--back"
              id="thumbnail-preview"
              style={{ backgroundImage: "url('/illustrations/geo-1.jpg')", filter: 'opacity(0.5)', height: '15rem', borderRadius: '5px' }}>
            </div>
            <label className="pos--center hover" htmlFor="thumbnail-file">Click to add thumbnail</label>
            <input type="file" id="thumbnail-file" onChange={props.uploadThumbnail} hidden/>
          </div>

          <div className="model__main__body__form">
            <div id="model-error" className="error hide">
              <p><b>Sorry, </b><span className="error-msg"></span></p>
            </div>

            <div className="input">
              <input type="text" id="model-name" placeholder="Model name" />
            </div>

            <div className="input margin--top-1">
              <input type="text" id="model-price" placeholder="model price (in rands)" />
            </div>

            <div className="input margin--top-1">
              <textarea id="model-description" placeholder="model description"></textarea>
            </div>

            <input type="file" id="model-file" onChange={props.uploadModelFile} hidden />
            <label className="margin--top-1 hover flex flex--a-center flex--j-space-between" htmlFor="model-file"><span><i className="fa-solid fa-circle-info margin--right-1"></i>Select model zip</span> <span className="hide" id="progress-perc">0% Complete</span></label>
          </div>
        </div>
        <div className="modal__main__footer flex">
          <button className="btn btn--primary margin--right-1">Add Model</button>
          <button className="btn" type="button" onClick={() => closeModal('new-model')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}