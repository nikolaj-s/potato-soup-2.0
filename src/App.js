
import React from 'react'
import Axios from 'axios'

import './App.css';
import { PotatoSoupInfo } from './components/potatoSoupInfo/PotatoSoupInfo';

import { DroppableComponent } from './components/DroppableComponent/DroppableComponent';
import { DragDropContext } from 'react-beautiful-dnd';
import { SavedImages } from './components/savedImages/SavedImages';
import { Footer } from './components/Footer/Footer';
import Cookies from 'universal-cookie'

import "./mobile.css"
import { LargeImageView } from './components/LargeImageView.js/LargeImageView';

function App() {

  const [images, setImages] = React.useState([])

  const [loading, toggleLoading] = React.useState(false)

  const [search, setSearch] = React.useState("")

  const [savedImages, setSavedImages] = React.useState([])

  const [savedMenuOpen, toggleSavedMenu] = React.useState(false)

  const [top, toggleTop] = React.useState(false)

  const [allImages, setAllImages] = React.useState([])

  const [index, setIndex] = React.useState(0)

  const [bigView, toggleBigView] = React.useState(false)

  const cookies = new Cookies();

  const getImages = () => {
    
    if (search === "" ) return;
    window.scrollTo(0, 0)
    
    toggleLoading(true)
    setSearch("")
    setImages([])

    const data = new FormData()

    data.append("search", search)
    data.append("limit", 30)

    //https://potato-soup.herokuapp.com/
    //http://10.0.0.203:5000/make-soup?search=
    Axios({url: 'https://soup-2.herokuapp.com/postsoup/', method: "POST", data}).then(res => {
     
      toggleLoading(false)

      let images = res.data.data;

      for (let i = 0; i < savedImages; i++) {
        for (let j = 0; j < images; j++) {
          if (savedImages[i] === images[j]) {
            images.splice(j, i)
          }
        }
      }

      setImages(images)
      
    }).catch(error => {
     
      toggleLoading(false)
    })

  }

  React.useEffect(() => {
    
    const saved = cookies.get('saved')

    if (saved !== undefined) {
      setSavedImages(saved)
    }

    window.onscroll = (e) => {

      const potato_soup_info = document.getElementsByClassName('potato-soup-info-container')[0]
      
      if (window.innerHeight < window.innerWidth) {
        if (potato_soup_info.getBoundingClientRect().top < -270) {
          toggleTop(true)
        } else {
          toggleTop(false)
        }
      }
        
    }


  }, [])

  const handleDragging = (obj) => {

    // prevent erro if destination is null
    const results = images;    

    const image = obj.draggableId;

    const saved_images = savedImages

    const source_index = obj.source.index

    const destination_index = obj.destination.index

    const destination = obj.destination.droppableId
    
    const source = obj.source.droppableId

    if (destination === source) {
      return;
    }

    if (source === "saved-image-array-container" && destination === "soup-container") {
      return;
    }
    
    if (source === "image-array-container" && (destination === "saved-image-array-container" || destination === "soup-container")) {
      // if source if rom search results and destination is saved image array or soup container move element to other aray and remove from results
      results.splice(source_index, 1)

      saved_images.splice(destination_index, 0, image)

    }

    if (source === "saved-image-array-container" && (destination !== "saved-image-array-container" || destination !== "soup-container")) {
      
      saved_images.splice(source_index, 1)

      results.splice(destination_index, 0, image)
    }

    if (source === "saved-image-array-container" && (destination === "soup-container" || destination === "saved-image-array-container")) {

      saved_images.splice(source_index, 1)

      saved_images.splice(destination_index, 0, image)
    }

    setImages(results)
    setSavedImages(saved_images)
    saved_to_cookie()
  }

  const toggleSavedImagesMenu = (e) => {
    if (savedMenuOpen) {
      toggleSavedMenu(false)
    } else {
      toggleSavedMenu(true)
    }
  }

  const saved_to_cookie = () => {
    const saved = savedImages;

    const json_str = JSON.stringify(saved)

    cookies.set('saved', json_str, {expires: new Date(2025, 11, 30, 0, 0, 0, 0)})

  }

  const enter = (e) => {
    

    if (e.keyCode === 13) {
      e.preventDefault()

      document.getElementById('search-bar').blur()
      getImages()
    }
  }
  
  const open_image = (e) => {

    const all_images = [...savedImages, ...images]
    
    const index = all_images.findIndex(el => el === e.target.currentSrc)
    
    if (index !== -1) {
      setAllImages(all_images)
      setIndex(index)
      setTimeout(() => {
        toggleSavedMenu(false)
        toggleBigView(true)
      }, 5)
    }

  }

  const close_big_view = (e) => {
    e.preventDefault()

    toggleBigView(false)
  }

  return (
    <div className="App">

      <header className="App-header">
        <h1>Potato Soup <span className="under-line-title">2.0</span></h1>
        <div className="input-container">
          <input id="search-bar" onKeyUp={enter} value={search} onChange={e => {setSearch(e.target.value)}} type="text" placeholder="Make Soup!"></input>
        </div>
        <button onClick={getImages}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.33 5.05C18.4962 5.04802 20.6142 5.68855 22.4162 6.89054C24.2183 8.09254 25.6233 9.80201 26.4536 11.8027C27.2839 13.8034 27.5022 16.0054 27.0808 18.1301C26.6595 20.2549 25.6174 22.2069 24.0864 23.7393C22.5554 25.2717 20.6043 26.3155 18.4799 26.7389C16.3556 27.1622 14.1534 26.9459 12.152 26.1174C10.1505 25.2889 8.43977 23.8855 7.23613 22.0845C6.03248 20.2836 5.39002 18.1661 5.39002 16C5.40315 13.1017 6.55966 10.3256 8.60818 8.27522C10.6567 6.22482 13.4317 5.06578 16.33 5.05V5.05ZM16.33 3C13.7589 3 11.2454 3.76244 9.10761 5.1909C6.96977 6.61935 5.30353 8.64968 4.31959 11.0251C3.33565 13.4006 3.07821 16.0144 3.57981 18.5362C4.08142 21.0579 5.31955 23.3743 7.13763 25.1924C8.95572 27.0105 11.2721 28.2486 13.7938 28.7502C16.3156 29.2518 18.9295 28.9944 21.3049 28.0104C23.6803 27.0265 25.7107 25.3603 27.1391 23.2224C28.5676 21.0846 29.33 18.5712 29.33 16C29.33 12.5522 27.9604 9.24558 25.5224 6.80761C23.0844 4.36964 19.7778 3 16.33 3Z" fill="white"/>
          <path d="M35 33.29L27.63 25.87L26.21 27.28L33.58 34.7C33.6726 34.7932 33.7826 34.8673 33.9039 34.918C34.0251 34.9687 34.1551 34.9951 34.2865 34.9956C34.4179 34.996 34.5481 34.9706 34.6697 34.9207C34.7912 34.8709 34.9018 34.7976 34.995 34.705C35.0883 34.6124 35.1624 34.5024 35.2131 34.3812C35.2638 34.2599 35.2901 34.1299 35.2906 33.9985C35.291 33.8671 35.2656 33.7369 35.2158 33.6154C35.1659 33.4938 35.0926 33.3832 35 33.29Z" fill="white"/>
          </svg>
        </button>
      </header>
      {bigView ? <LargeImageView close={close_big_view} index={index} all_images={allImages} /> : null }
      <div className="outer-container">
        
        <DragDropContext onDragEnd={handleDragging} >
          <PotatoSoupInfo toggleSavedImages={toggleSavedImagesMenu} top={top} savedImages={savedImages} />
          <DroppableComponent openImage={open_image} handleDragging={handleDragging} loading={loading} images={images} />
          {savedMenuOpen ? <SavedImages toggleLargeView={open_image} toggleSavedImages={toggleSavedImagesMenu} savedImages={savedImages} /> : null}
        </DragDropContext>
      </div>
      <Footer />
    </div>
  );
}

export default App;
