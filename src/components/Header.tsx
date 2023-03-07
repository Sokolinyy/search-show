import React, { useState } from 'react'
import searchIcon from "../assets/search-icon.svg"
import tvIcon from "../assets/television-icon.svg"
import axios from "axios"

type Props = {
  setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
}

// Define interface for API request
interface TVShow {
  show: {
    name: string,
    id: number,
  }
}

const Header = ({ setSearchResults }: Props) => {

  const handleApi = () => {
    // Get search result from input value
    axios.get(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response => {
      // 
      const searchResults: string[] = response.data.map(
        (result: TVShow) => result.show.name
      );
      console.log(searchResults);
      setSearchResults(searchResults)
    })
    .catch(error => {
      console.log(error);
    }); 
  }

  const [inputValue, setInputValue] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo-box'>
          <img className='logo-img' src={tvIcon} alt="" />
          TV SEARCH
        </div>
        <div className='about-search-box'>
          <div className='search'>
            <input type="text" placeholder='Search...' value={inputValue} onChange={handleInputChange}/>
            <img className='search-icon' onClick={handleApi} src={searchIcon} alt="" />
          </div>
          <div className='about'>
            About
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header