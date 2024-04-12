import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { BASEURL, getQuery } from "../helpers/URL"
import { getElementById, getValueById } from "../helpers/dom"
import { getUserBySession, getUserByUsername, postWithAuth, postWithAxios } from "../helpers/http"
import { closeModal, openModal } from "../helpers/modals"
import { addInputFile } from "../helpers/inputs"

import AccountHeader from "../Components/Header/AccountHeader"
import Portraint from "../Components/Modal/Portrait"
import Model from "../Components/Modal/Model"
import ViewModel from "../Components/Modal/ViewModel"
import ArtItem from "../Components/ArtItem/ArtItem"
import Authenticator, { AuthContext } from "../Auth/Authenticator"

import "./account.css"
import { showError } from "../helpers/error"

const getArtworks = async (kind: string, username: string): Promise<any> => {
  const res = await postWithAuth('/works/get/all/by/artist/username', {
    kind,
    username
  })

  return res;
}

export default () => {
  console.log('Rendering Profile');
  
  const [works, setWorks] = useState([]);
  const [model, setModel] = useState(null);
  const [user, setUser] = useState(null) as any;
  const [currentUser, setCurrentUser] = useState(null) as any;
  const { username } = useParams()

  useEffect(() => {
    (async () => {
      await setArtwork();
      setUser(await getUserBySession())
      setCurrentUser(await getUserByUsername(username))
    })()
  }, [getQuery('kind')]);

  const setArtwork = async () => {
    const res = await getArtworks(getQuery('kind') as string, username as string);

    setWorks(res.works);
  }

  const uploadPortrait = async () => {
    const data = addInputFile('portrait-file', 'portrait');

    const res = await postWithAxios(`/portrait/add/file`, data)

    if (res.successful) {
      (getElementById('portrait-preview') as HTMLElement).style.backgroundImage =
        `url("${BASEURL()}/assets/uploads/artwork/portraits/${res.portrait}")`;

      return;
    }

    showError('portrait', res.error);
  };

  const uploadThumbnail = async () => {
    const data = addInputFile('thumbnail-file', 'thumbnail');

    const res = await postWithAxios(`/model/add/thumbnail`, data)

    if (res.successful) {
      (getElementById('thumbnail-preview') as HTMLElement).style.backgroundImage =
        `url("${BASEURL()}/assets/uploads/artwork/thumbnails/${res.thumbnail}")`;

      return;
    }

    if (res.error)
      showError('model', res.error);
  }; 

  const uploadModelFile = async () => {
    const data = addInputFile('model-file', 'model');

    const res = await postWithAxios(`/model/add/file`, data, {
      progress: (e: any) => {
        const progress = Math.round((e.loaded * 100) / e.total)

        const elem = getElementById('progress-perc')

        elem.classList.remove('hide')

        if (progress < 95) elem.innerText = `${progress}% Complete`
        else setTimeout(() => elem.innerText = `${progress}% Complete`, 2000)
      }
    })

    if (res.error)
      showError('model', res.error);
  }; 

  const uploadPortraitDetails = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithAuth('/portrait/add/details', {
      name: getValueById('portrait-name'),
      price: getValueById('portrait-price'),
      description: getValueById('portrait-description'),
    })

    
    if (res.successful) {
      await setArtwork()

      return closeModal('new-portrait');
    }
      
    showError('portrait', res.error);
  }

  const uploadModelDetails = async (e: any) => {
    (e as PointerEvent).preventDefault();

    const res = await postWithAuth('/model/add/details', {
      name: getValueById('model-name'),
      price: getValueById('model-price'),
      description: getValueById('model-description'),
    })

    if (res.successful) {
      await setArtwork()

      closeModal('new-model');

      return;
    }

    showError('model', res.error);
  }

  const removeArtwork = async (artworkId: string) => {
    await postWithAuth('/works/remove', { artworkId })

    await setArtwork();
  }

  function openIn3D (artwork: any) {
    setModel(artwork);
  }

  function close3D() {
    setModel(null);
  }

  return (
    <Authenticator>
      <AccountHeader/>
      <main className="account flex flex--a-start">
        <UserOverview/>
        <div className="account__works">
          <div className="account__title">
            <h1>My artworks</h1>
            <p>3D Models &amp; Portraits</p>
          </div>
          <div className="flex flex--a-center">
            <ul className="account__works__tabs flex">
              <li className={`${!getQuery('kind') ? 'account__works__tabs__active' : ''} btn`}><Link to={`/u/${username}`}>All</Link></li>
              <li className={`${getQuery('kind') == 'model' ? 'account__works__tabs__active' : ''} btn`}><Link to={`/u/${username}?kind=model`}>Models</Link></li>
              <li className={`${getQuery('kind') == 'portrait' ? 'account__works__tabs__active' : ''} btn`}><Link to={`/u/${username}?kind=portrait`}>Portraits</Link></li>
            </ul>
            <div style={{ width: '1px', height: '3rem', backgroundColor: '#999', margin: '0 2rem' }}></div>
            <p><Link to={`/u/${username}/spaces`}>Exhibition spaces</Link></p>
          </div>

          <div className="account__works__list">
            {works.map((artwork: any) => <ArtItem isOwner={user && currentUser && user.email == currentUser.email} removeArtwork={removeArtwork} openIn3D={() => openIn3D(artwork)} inProfile={true} key={artwork._id} {...artwork}/>)}
            
            {
              user && currentUser && user.email == currentUser.email ?
              (
                <div className="account__works__add flex flex--center" style={{ flexDirection: "row" }}>
                  <div className="flex flex--a-center hover" style={{ flex: '1', flexDirection: 'column' }} onClick={() => openModal('new-portrait')}>
                    <svg className="image--icon">
                      <use href="#add"></use>
                    </svg>
                    <p>Add Portraint</p>
                  </div>
                  <div className="flex flex--a-center hover" style={{ flex: '1', flexDirection: 'column' }} onClick={() => openModal('new-model')}>
                    <svg className="image--icon">
                      <use href="#add"></use>
                    </svg>
                    <p>Add Model</p>
                  </div>
                </div>
              ) : (<></>)
            }
          </div>
        </div>
      </main>
      
      {model && <ViewModel close3D={close3D} {...(model as object)} />}

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

export function UserOverview () {
  const { user } = useContext(AuthContext);
  const [_user, setUser] = useState(null) as any;
  const { username } = useParams();
  
  useEffect(() => {
    (async () => {
      const res = await postWithAuth('/user/get/by/username', {
        username
      })

      setUser(
        res.user
      )
    })()
  }, []);

  return (!user) ? 
    (<p>Loading</p>) : (
    <div className="account__user flex">
      <div className="account__user__profile image--back image--round" style={{ backgroundImage: 'url("/profiles/2023/10/23/blank.jpg")' }}></div>
      <h2 className="account__user__name">{_user?.fullname}</h2>
      <p>Artist</p>

      {user.email == _user?.email && (<button className="btn btn--primary">Edit profile</button>) }
  </div>
  )
}