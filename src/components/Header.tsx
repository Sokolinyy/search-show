import React from 'react'
import searchIcon from "../assets/search-icon.svg"
import tvIcon from "../assets/television-icon.svg"

type Props = {}

const Header = (props: Props) => {
  return (
    <header className='header'>
      <div className='header-container'>
        <div className='logo-box'>
          <img className='logo-img' src={tvIcon} alt="" />
          TV SEARCH
        </div>
        <div className='about-search-box'>
          <div className='search'>
            <input placeholder='Search...'/>
            <img className='search-icon' src={searchIcon} alt="" />
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