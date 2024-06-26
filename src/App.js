import { useState } from 'react';
import './App.css';

function App() {

  const [photos,setPhotos] = useState([]);
  const [inputValue,setinputValue]=useState('');
  const handleInput =(e) =>{
    setinputValue(e.target.value);
  }

  async function imageGenerator(){
    
    const urlApi ="https://pixabay.com/api/?&image_type=photo&pretty=true&per_page=7";
    const keyApi = "44615372-6c9ab44c6c3133d5cb157b0b3";
    
    
    try{
      const response = await fetch(urlApi + `&q=${inputValue}` + `&key=${keyApi}`);
      console.log(response);
      if(!response.ok){
        alert("error");
      }
      let images = await response.json();

      setPhotos(images.hits);
      return images;
      
    }
    catch (error){
      console.error('Error',error);
    };
  }
  //console.log(imageGenerator());
  
  const mapper = (element) => (
    <img src={element.webformatURL}/>
  )

  const mappedImages = photos.map(mapper);
  
  

  return (
    <div >
      
      <h1> Image Search Engine</h1>

      <div className='search'>
        <input type='texte' className='search-box' onChange={handleInput} placeholder='Search anything here ...'/>
        <button className='search-btn' onClick={imageGenerator}> search </button>
      </div>
      <div id='search-result'> {mappedImages} </div>
      <button id='show-more-btn'> show more </button>
    </div>
  );
}

export default App;
