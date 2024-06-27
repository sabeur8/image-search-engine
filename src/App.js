import { useState } from 'react';
import './App.css';

function App() {

  const [photos,setPhotos] = useState([]);
  const [imagesPerPage,setImagePerPage] = useState(7);
  const [inputValue,setinputValue]=useState('');
  const handleInput =(e) =>{
    setinputValue(e.target.value);
  }

  async function imageGenerator(){
    
    const urlApi ="https://pixabay.com/api/?&image_type=photo&pretty=true";
    const keyApi = "44615372-6c9ab44c6c3133d5cb157b0b3";
    
    
    try{
      fetch(urlApi + `&q=${inputValue}` + `&key=${keyApi}` + `&per_page=${imagesPerPage}`)
      
      .then(response =>{
        return response.json();
      })
      .then(images => {
        setPhotos(images.hits);
      })
      
    }
    catch (error){
      console.error('Error',error);
    };
  }
  function generateMoreImages(){
    setImagePerPage(imagesPerPage + 5)
    imageGenerator();
  }

  const handleKey = (event) =>{
    if(event.key === 'Enter'){
      imageGenerator();
    }
  }
  
  const mapper = (element) => (
    <img src={element.webformatURL}/>
  )

  const mappedImages = photos.map(mapper);

  return (
    <div >
      
      <h1> Image Search Engine</h1>

      <div className='search'>
        <input type='texte' className='search-box' onKeyUp={handleKey} onChange={handleInput} placeholder='Search anything here ...'/>
        <button className='search-btn' onClick={imageGenerator}> search </button>
      </div>
      <div id='search-result'> {mappedImages} </div>
      <button id='show-more-btn' onClick={generateMoreImages}> show more </button>
    </div>
  );
}

export default App;
