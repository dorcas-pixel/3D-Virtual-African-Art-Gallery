import { Link } from "react-router-dom"
import { useEffect, useState } from "react";

import BaseHeader from "../Components/Header/BaseHeader"
import Session from "../Auth/Session"
import { getQuery } from "../helpers/URL";
import { postWithAuth } from "../helpers/http";
import ArtItem from "../Components/ArtItem/ArtItem";
import { Popup } from "../Cart/Cart";
import ViewModel from "../Components/Modal/ViewModel";

const getArtworks = async (kind: string): Promise<any> => {
  const res = await postWithAuth('/works/get/all', {
    kind
  })

  return res;
}

export default () => {
  console.log('Rendering Mart');

  const [works, setWorks] = useState([]);
  const [popupMsg, setPopupMsg] = useState('');
  const [model, setModel] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getArtworks(getQuery('kind') as string);

      setWorks(res.works);
    })()
  }, [getQuery('kind')]);

  function clearPopup () {
    setPopupMsg('');
  }

  function setPopupMessage(msg: string) {
    setPopupMsg(msg);
  }

  function openIn3D (artwork: any) {
    setModel(artwork);
  }

  function close3D() {
    setModel(null);
  }

  return (
    <Session>
      <BaseHeader/>
      <div className="works">
        <div className="browse__works">
          <ul className="browse__works__tabs flex">
            <li className="browse__works__tabs__active btn">All</li>
            <li className="btn"><Link to={`/marketplace?kind=model`}>Models</Link></li>
            <li className="btn"><Link to={`/marketplace?kind=portrait`}>Portraits</Link></li>
          </ul>

          <div className="browse__works__list">
            {works.map((artwork: any) => <ArtItem key={artwork._id} openIn3D={() => openIn3D(artwork)} setPopupMessage={setPopupMessage} {...artwork} />)}
          </div>
        </div>
      </div>

      {model && <ViewModel close3D={close3D} {...(model as object)} />}

      { popupMsg && (
        <Popup clearPopup={clearPopup}>
          {popupMsg}
        </Popup>
      ) }
    </Session>
  )
}