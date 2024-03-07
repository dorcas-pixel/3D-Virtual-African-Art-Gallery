import { useContext, useEffect, useState } from "react"
import { SERVERURL, getQuery } from "../helpers/URL"
import { getElementById, getValueById } from "../helpers/dom"
import { postWithAuth, postWithAxios } from "../helpers/http"
import { closeModal, openModal } from "../helpers/modals"
import { addInputFile } from "../helpers/inputs"

import AccountHeader from "../Components/Header/AccountHeader"
import Portraint from "../Components/Modal/Portrait"
import ArtItem from "../Components/ArtItem/ArtItem"
import Authenticator, { AuthContext } from "../Auth/Authenticator"

import "./account.css"

const getArtworks = async (): Promise<any> => {
  const res = await postWithAuth('/works/get/all/by/artist', {
    kind: getQuery('kind')
  })

  return res;
}

export default () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    (async () => {
      await setArtwork();
    })()
  }, []);

  const setArtwork = async () => {
    const res = await getArtworks();

    setWorks(res.works);
  }

  const uploadPortrait = async () => {
    const data = addInputFile('portrait-file', 'portrait');

    const res = await postWithAxios(`/portrait/add/file`, data)

    if (res.successful) {
      (getElementById('portrait-preview') as HTMLElement).style.backgroundImage =
        `url("${SERVERURL}/assets/uploads/artwork/portraits/${res.portrait}")`;
    }
  };

  const uploadPortraitDetails = async (e: any) => {
    (e as PointerEvent).preventDefault();

    await postWithAuth('/portrait/add/details', {
      name: getValueById('portrait-name'),
      description: getValueById('portrait-description'),
    })

    await setArtwork()

    closeModal('new-portrait');
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
            <li className="account__works__tabs__active btn">All</li>
            <li className="btn">Models</li>
            <li className="btn">Portraits</li>
          </ul>

          <div className="account__works__list">
            {works.map((artwork: any) => <ArtItem key={artwork._id} {...artwork}/>)}
            <div className="account__works__add flex flex--center" onClick={() => openModal('new-portrait')}>
              <svg className="image--icon">
                <use href="#add"></use>
              </svg>
              <p>Add Portraint</p>
            </div>
          </div>
        </div>
      </main>
      <Portraint
        uploadPortrait={uploadPortrait}
        uploadPortraitDetails={uploadPortraitDetails}
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