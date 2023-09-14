import React, {useRef} from 'react'
import { searchRequest } from '../services'
import "../App.css";
function Search({reset}) {
  const keyword = useRef();
    const handleSearch = async () => {
        const data = await searchRequest(keyword.current.value);
        reset(data);
    }
    
  return (
    <div className='searchContainer'>
     <input className='searchInput' placeholder="Search" ref={keyword}></input>
     <button className="purpleButton" onClick={handleSearch}>Search</button>
    </div>
  )
}

export default Search