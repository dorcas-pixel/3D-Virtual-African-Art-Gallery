import { useEffect, useRef, useState } from "react"
import { getElementById } from "../helpers/dom"

import T3Helper from "../helpers/T3"

import "./Gallery.css"
import { getArtistWorks } from "../helpers/artwork";


export default () => {
  const refCon = useRef(null);

  const threeHelper = new T3Helper(window.innerWidth, window.innerHeight);
  threeHelper.setCameraPosition()

  threeHelper.loader.load(`/3D/vr_gallery/scene.gltf`, (gltf: any) => {
    gltf.scene.children[0].rotation.z = threeHelper.degToRad(-90)

    threeHelper.scene.add(gltf.scene)

    threeHelper.animate()
  })

  threeHelper.displayStands();
  threeHelper.displayPaintings();

  const [portraits, setPortraits] = useState(null) as any;
  const [models, setModels] = useState(null) as any;

  useEffect(() => {
    refCon.current &&
      (refCon.current as HTMLElement).appendChild(threeHelper.renderer.domElement);

    refCon.current &&
      (refCon.current as HTMLElement).appendChild(threeHelper.stats.dom)
  }, [])

  const startTour = () => {
    const menu = getElementById('tour-menu') as HTMLElement;

    threeHelper.lock(menu)

    getElementById('model-scale')?.classList.add('hide');
    getElementById('model-selections')?.classList.add('hide');
  }

  const showPortraits = async () => {
    getElementById('portrait-selections')?.classList.remove('hide');

    setPortraits((await getArtistWorks('portrait')).works)
  }

  const displayPortrait = (portrait: any) => {
    threeHelper.displayPainting(portrait)
  }

  const displayModel = (model: any) => {
    threeHelper.displayModel(model)
  }

  const showModels = async () => {
    getElementById('model-selections')?.classList.remove('hide');

    setModels((await getArtistWorks('model')).works)
  }

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
        <ul className="container__gallery__overlay__horiz-menu flex">
          <li onClick={startTour}>Continue tour</li>
          <li onClick={showModels}>Upload model</li>
          <li onClick={showPortraits}>Upload portrait</li>
        </ul>
        <p className="container__gallery__overlay__tips">Use <b>WASD</b> keys for movement, and the <b>esc</b> key to stop tour</p>
      
        <div className="container__gallery__overlay__models card card__body hide" id="portrait-selections">
          <p><b>Portraits</b></p>
          <ul className="margin--top-1">
            {portraits?.map((portrait: any) => (
              <li onClick={() => displayPortrait(portrait)} key={portrait._id}>{portrait.name}</li>
            ))}
          </ul>
        </div>

        <div className="container__gallery__overlay__models card card__body hide" id="model-selections">
          <p><b>Models</b></p>
          <ul className="margin--top-1">
            {models?.map((model: any) => (
              <li onClick={() => displayModel(model)} key={model._id}>{model.name}</li>
            ))}
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