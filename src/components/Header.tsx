import React, { useState } from 'react'
import searchIcon from "../assets/search-icon.svg"
import tvIcon from "../assets/television-icon.svg"
import axios from "axios"

type Props = {}

// Define interface for API request
export interface TVShow {
  show: {
    name: string
  }
}

const Header = (props: TVShow) => {

  const api = () => {
    // Get search result from input value
    axios.get(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response => {
      // 
      const searchResults: TVShow[] = response.data;
      searchResults.forEach(result => {
      console.log(result.show.name);
    });
    })
    .catch(error => {
      console.log(error);
    }); 
  }

  const [inputValue, setInputValue] = useState<string>("")

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  console.log(inputValue)

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
            <img className='search-icon' onClick={api} src={searchIcon} alt="" />
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