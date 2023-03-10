import Header from "./components/Header"
import SearchResult from "./components/SearchResult";
import { Routes, Route } from "react-router-dom";
import Shows from "./components/Shows";
import { useState } from "react";
import { SearchContext } from "./components/SearchContext";
import Home from "./Pages/Home";
import tvImage from "./assets/Daco_13269.png"

function App() {
  const [data, setData] = useState<{ id: number; name: string }[]>([]);

  return (
    <div className="App">
      <SearchContext.Provider value={{data, setData}}>
        <Header />
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/search-result" element={<SearchResult /> }/>
          <Route path="/:id" element={<Shows /> }/>
        </Routes>
      </SearchContext.Provider>
    </div>
  )
}

export default App