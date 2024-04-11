import { useEffect, useRef, useState } from "react";
import { closeModal } from "../../helpers/modals"
import "./modal.css"
import T3Helper from "../../helpers/T3";
import { BASEURL } from "../../helpers/URL";

export default (props: any) => {
  const refCon = useRef(null);

  const [threeHelper, setThreeHelper] = useState(null) as any;

  useEffect(() => {
    setThreeHelper(new T3Helper(window.innerWidth * .5, window.innerHeight * .45));
  }, [])

  useEffect(() => {
    if (threeHelper?.renderer.getContext()) {
      threeHelper.useOrbitalControls();
      threeHelper.setCameraPosition();

      threeHelper.loader.load(`${BASEURL()}/assets/uploads/artwork/models/${props.model.folder}/scene.gltf`, (gltf: any) => {
        gltf.scene.children[0].position.set(0,0,0);
        threeHelper.scene.add(gltf.scene.children[0])

        threeHelper.animate()
      })
    }

    if (threeHelper) {
      refCon.current &&
        (refCon.current as HTMLElement).appendChild(threeHelper?.renderer.domElement);
    }
  }, [threeHelper])

  function close3D () {
    props.close3D()

    closeModal('view-model')
  }

  return (
    <div className="modal" id="view-model-modal">
      <form className="modal__main" style={{ width: `${window.innerWidth * .5}px` }}>
        <div className="modal__main__header">
          <h4>{props.name}</h4>
        </div>
        <div ref={refCon}></div>
        <div className="modal__main__footer flex">
          <button className="btn" type="button" onClick={() => close3D()}>Close</button>
        </div>
      </form>
    </div>
  )
}