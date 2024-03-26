import { useContext, useEffect, useState } from "react"
import { getQuery } from "../helpers/URL"
import { getElementById, getValueById } from "../helpers/dom"
import { postWithAuth, postWithAxios } from "../helpers/http"
import { closeModal, openModal } from "../helpers/modals"
import { addInputFile } from "../helpers/inputs"

import AccountHeader from "../Components/Header/AccountHeader"
import Portraint from "../Components/Modal/Portrait"
import ArtItem from "../Components/ArtItem/ArtItem"
import Authenticator, { AuthContext } from "../Auth/Authenticator"

import "./account.css"
import { Link, useParams } from "react-router-dom"
import Model from "../Components/Modal/Model"

const getArtworks = async (kind: string): Promise<any> => {
  const res = await postWithAuth('/works/get/all/by/artist', {
    kind
  })

  return res;
}

export default () => {
  const [works, setWorks] = useState([]);
  const { username } = useParams()

  useEffect(() => {
    (async () => {
      await setArtwork();
    })()
  }, [getQuery('kind')]);

  const setArtwork = async () => {
    const res = await getArtworks(getQuery('kind') as string);

    setWorks(res.works);
  }

  const uploadPortrait = async () => {
    const data = addInputFile('portrait-file', 'portrait');

    const res = await postWithAxios(`/portrait/add/file`, data)

    if (res.successful) {
      (getElementById('portrait-preview') as HTMLElement).style.backgroundImage =
        `url("/assets/uploads/artwork/portraits/${res.portrait}")`;
    }
  };

  const uploadThumbnail = async () => {
    const data = addInputFile('thumbnail-file', 'thumbnail');

    const res = await postWithAxios(`/model/add/thumbnail`, data)

    if (res.successful) {
      (getElementById('thumbnail-preview') as HTMLElement).style.backgroundImage =
        `url("/assets/uploads/artwork/thumbnails/${res.thumbnail}")`;
    }
  }; 

  const uploadModelFile = async () => {
    const data = addInputFile('model-file', 'model');

    await postWithAxios(`/model/add/file`, data)
  }; 

  const uploadPortraitDetails = async (e: any) => {
    (e as PointerEvent).preventDefault();

    await postWithAuth('/portrait/add/details', {
      name: getValueById('portrait-name'),
      price: getValueById('portrait-price'),
      description: getValueById('portrait-description'),
    })

    await setArtwork()

    closeModal('new-portrait');
  }

  const uploadModelDetails = async (e: any) => {
    (e as PointerEvent).preventDefault();

    await postWithAuth('/model/add/details', {
      name: getValueById('model-name'),
      price: getValueById('model-price'),
      description: getValueById('model-description'),
    })

    await setArtwork()

    closeModal('new-model');
  }

  return (
    <Authenticator>
      <AccountHeader/>
      <main className="account flex">
        <UserOverview/>
        <div className="account__works">
          <div className="account__title">
            <h1>My artworks</h1>
            <p>3D Models &amp; Portraits</p>
          </div>
          <ul className="account__works__tabs flex">
            <li className={`${!getQuery('kind') ? 'account__works__tabs__active' : '' } btn`}><Link to={`/u/${username}`}>All</Link></li>
            <li className={`${getQuery('kind') == 'model' ? 'account__works__tabs__active' : '' } btn`}><Link to={`/u/${username}?kind=model`}>Models</Link></li>
            <li className={`${getQuery('kind') == 'portrait' ? 'account__works__tabs__active' : '' } btn`}><Link to={`/u/${username}?kind=portrait`}>Portraits</Link></li>
          </ul>

          <div className="account__works__list">
            {works.map((artwork: any) => <ArtItem inProfile={true} key={artwork._id} {...artwork}/>)}
            <div className="account__works__add flex flex--center" style={{ flexDirection: "row" }}>
              <div className="flex flex--a-center" style={{ flex: '1', flexDirection: 'column' }} onClick={() => openModal('new-portrait')}>
                <svg className="image--icon">
                  <use href="#add"></use>
                </svg>
                <p>Add Portraint</p>
              </div>
              <div className="flex flex--a-center" style={{ flex: '1', flexDirection: 'column' }} onClick={() => openModal('new-model')}>
                <svg className="image--icon">
                  <use href="#add"></use>
                </svg>
                <p>Add Model</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Portraint
        uploadPortrait={uploadPortrait}
        uploadPortraitDetails={uploadPortraitDetails}
        />

      <Model
        uploadThumbnail={uploadThumbnail}
        uploadModelFile={uploadModelFile}
        uploadModelDetails={uploadModelDetails}
      />
    </Authenticator>
  )
}

function UserOverview () {
  const { user } = useContext(AuthContext);

  return (
    <div className="account__user flex">
      <div className="account__user__profile image--back image--round" style={{ backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")' }}></div>
      <h2 className="account__user__name">{user.fullname}</h2>
      <p>Artist</p>
      <button className="btn btn--primary">Edit profile</button>
    </div>
  )
}