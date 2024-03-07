import { useEffect, useRef, useState } from "react"

import { getElementById, getElementValueById } from "../helpers/dom"

import T3Helper from "../helpers/T3"

import "./Gallery.css"

const threeHelper = new T3Helper(window.innerWidth, window.innerHeight);
threeHelper.setCameraPosition()

threeHelper.loader.load(`/3D/vr_gallery/scene.gltf`, (gltf: any) => {
  // gltf.scene.children[0].scale.set(.03, .03, .03)
  gltf.scene.children[0].rotation.z = threeHelper.degToRad(-90)

  threeHelper.scene.add(gltf.scene)

  threeHelper.animate()
})

// threeHelper.loadPedestals();
threeHelper.displayPaintings();

export default () => {
  console.log("Gallery open")

  const refCon = useRef(null);

  const [models, setModels] = useState(null) as any;

  useEffect(() => {
    refCon.current &&
      (refCon.current as HTMLElement).appendChild(threeHelper.renderer.domElement);
  }, [refCon.current])

  const startTour = () => {
    const menu = getElementById('tour-menu') as HTMLElement;

    threeHelper.lock(menu)

    getElementById('model-scale')?.classList.add('hide');
    getElementById('model-selections')?.classList.add('hide');
  }

  // const showcaseModel = async () => {
  //   threeHelper.showcaseModel()

  //   getElementById('model-selections')?.classList.remove('hide');

  //   setModels((await getArtistWorks('model')).works)
  // }

  // const loadModel = (work: any) => {
  //   threeHelper.loadModel(work);

  //   getElementById('model-scale')?.classList.remove('hide');
  // }

  // const adjustScale = () => {
  //   threeHelper.adjustScale(parseFloat(getElementValueById('scale-input') as string));
  // }

	return (
		<main className="container__gallery">
      <div id="tour-menu" className="container__gallery__overlay">
        <ul className="container__gallery__overlay__horiz-menu card card__body flex">
          <li onClick={startTour}>Continue tour</li>
          <li>Upload model</li>
          <li>Upload painting</li>
        </ul>
        <p className="container__gallery__overlay__tips">Use <b>WASD</b> keys for movement, and the <b>esc</b> key to stop tour</p>
      
        <div className="container__gallery__overlay__models card card__body hide" id="model-selections">
          <p>Models</p>
          <ul className="margin--top-1">
            
          </ul>
        </div>

        <div className="container__gallery__overlay__scale card card__body margin--top-2 hide" id="model-scale">
          <p>Adjust scale view model</p>
          <input type="range" className="margin--top-2" style={{ width: '100%' }} id="scale-input" step="0.001" min="0" max="1"  />
        </div>
      </div>
      <div id="gallery" ref={refCon}></div>
    </main>
	)
}