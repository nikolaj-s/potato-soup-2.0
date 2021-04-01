
import React from 'react'
import Axios from 'axios'

import './App.css';
import { Image } from './components/Image/Image';

function App() {

  const [images, setImages] = React.useState([])

  const [search, setSearch] = React.useState("")

  const getImages = (e) => {
    e.preventDefault()
    setSearch("")
    Axios.post(URL=`http://127.0.0.1:8000/make-soup?search=${search}`).then(res => {
      console.log(res)  
      setImages(res.data.data)
    })

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Potato Soup <span className="under-line-title">2.0</span></h1>
        <div className="input-container">
          <input value={search} onChange={e => {setSearch(e.target.value)}} type="text" placeholder="Make Soup!"></input>
        </div>
        <button onClick={getImages}>S</button>
      </header>

      <div className="image-array-container">
        {images.map(image => {
          return <Image key={image} image={image} />
        })}
      </div>
    </div>
  );
}

export default App;
