import { useEffect, useRef, useState } from "react"
import { getElementById, getValueById } from "../helpers/dom"

import T3Helper from "../helpers/T3"

import "./Gallery.css"
import { getArtistWorks } from "../helpers/artwork";

const threeHelper = new T3Helper(window.innerWidth, window.innerHeight);
if (threeHelper.renderer.getContext()){
  threeHelper.setCameraPosition()

  threeHelper.loader.load(`/3D/vr_gallery/scene.gltf`, (gltf: any) => {
    gltf.scene.children[0].rotation.z = threeHelper.degToRad(-90)

    threeHelper.scene.add(gltf.scene.children[0])

    threeHelper.animate()
  })

  threeHelper.displayStands();
  threeHelper.displayPaintings();
}

export default () => {
  const refCon = useRef(null);

  const [portraits, setPortraits] = useState([]) as any;
  const [models, setModels] = useState([]) as any;
  const [position, setPosition] = useState({
    z: 0,
    y: 0,
    x: 0
  }) as any;

  useEffect(() => {
    refCon.current &&
      (refCon.current as HTMLElement).appendChild(threeHelper.renderer.domElement);

    refCon.current &&
      (refCon.current as HTMLElement).appendChild(threeHelper.stats.dom)
  }, [])

  useEffect(() => {
    threeHelper.adjustPosition(position)
  }, [position])

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

  const displayModel = async (model: any) => {
    setPosition(await threeHelper.displayModel(model))
    
    getElementById('model-scale')?.classList.remove('hide');
  }

  const showModels = async () => {
    getElementById('model-selections')?.classList.remove('hide');

    setModels((await getArtistWorks('model')).works)
  }

  const adjustScale = () => {
    threeHelper.adjustScale(parseFloat(getValueById('scale-input') as string));
  }

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
          <p className="margin--top-1" style={{ textAlign: 'center' }} onClick={() => getElementById('model-scale')?.classList.remove('hide')}>Resume controls</p>
        </div>

        <div className="container__gallery__overlay__scale card card__body margin--top-2 hide" id="model-scale">
          <p>Adjust scale view model</p>
          <input type="range" className="margin--top-2" onChange={adjustScale} style={{ width: '100%' }} id="scale-input" step="0.0001" min="0" max="1"  />
          <p>Position</p>
          <div className="flex position">
            <div className="input flex">
              <label htmlFor="">X</label>
              <input type="number" onChange={(e) => setPosition({ ...position, x: e.target.value })} value={position?.x} step="0.01" />
            </div>
            <div className="input flex">
              <label htmlFor="">Y</label>
              <input type="number" onChange={(e) => setPosition({ ...position, y: e.target.value })} value={position?.y} step="0.01" />
            </div>
            <div className="input flex">
              <label htmlFor="">Z</label>
              <input type="number" onChange={(e) => setPosition({ ...position, z: e.target.value })} value={position?.z} step="0.01"/>
            </div>
          </div>
        </div>
      </div>
      <div id="gallery" ref={refCon}></div>
    </main>
	)
}