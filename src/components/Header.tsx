import React, { useEffect, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import tvIcon from "../assets/television-icon.svg";
import axios from "axios";
import SearchResult from "./SearchResult";
import Shows from "./Shows";
import { Link, useNavigate, Route, Routes } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { useContext } from "react";
// Define interface for API request
interface TVShow {
  name: string;
  id: number;
}

const Header = () => {
  // Const for grab the value of input
  const [inputValue, setInputValue] = useState("");
  const { data, setData } = useContext(SearchContext);

  const handleApi = async () => {
    // Sends a GET request to the TVMaze API with a search query
    // generated from the inputValue state variable. If there are any
    // search results, extracts the show ID and name and updates the
    // data state variable using the setData function. Logs the data array
    // to the console for debugging purposes.
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${inputValue}`)
      .then((response) => {
        const data = response.data.map((item: { show: TVShow }) => {
          const { show } = item;
          const { id, name } = show;
          return { id, name };
        });
        if (data.length > 0) {
          setData(data);
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  // Set value of inputValue to user input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  
  // Every time when user write into field, call handleApi, 
  useEffect(() => {
    handleApi()
  }, [inputValue]);

  return (
      <header className="header">
        <div className="header-container">
          <Link to="/" className="logo-box">
            <img className="logo-img" src={tvIcon} alt="" />
            TV SEARCH
          </Link>
          <div className="about-search-box">
            <div className="search">
            <Link to="/search-result">
              <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
              />
            </Link>
                <img
                  className="search-icon"
                  onClick={handleApi}
                  src={searchIcon}
                  alt=""
                />
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;
