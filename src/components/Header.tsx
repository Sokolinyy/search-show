import React, { useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import tvIcon from "../assets/television-icon.svg";
import axios from "axios";
import Main from "./Main";

// Define interface for API request
interface TVShow {
  name: string;
  id: number;
}

const Header = () => {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleApi = () => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="logo-box">
            <img className="logo-img" src={tvIcon} alt="" />
            TV SEARCH
          </div>
          <div className="about-search-box">
            <div className="search">
              <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
              />
              <img
                className="search-icon"
                onClick={handleApi}
                src={searchIcon}
                alt=""
              />
            </div>
            <div className="about">About</div>
          </div>
        </div>
      </header>
      <Main data={data} />
    </>
  );
};

export default Header;
