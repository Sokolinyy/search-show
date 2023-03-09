import Header from "./components/Header"
import SearchResult from "./components/SearchResult";
import { Routes, Route } from "react-router-dom";
import Shows from "./components/Shows";
import { useState } from "react";
import { SearchContext } from "./components/SearchContext";
import About from "./Pages/About";
import Home from "./Pages/Home";

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
          <Route path="/about" element={<About /> }/>
        </Routes>
      </SearchContext.Provider>
    </div>
  )
}

export default App
