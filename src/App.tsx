import Header from "./components/Header"
import SearchResult from "./components/SearchResult";
import { Routes, Route } from "react-router-dom";
import Shows from "./components/Shows";
import { useState } from "react";
import { SearchContext } from "./components/SearchContext";
import Home from "./Pages/Home";

function App() {
  // State for set SearchContext
  const [data, setData] = useState<{ id: number; name: string }[]>([]);

  return (
    <div className="App">
      {/* Wrapping everything in SearchContext for
      access the variable data and setData in all components */}
      <SearchContext.Provider value={{data, setData}}>
        <Header />
        {/* Routes coming from router-dom, and they define
          how different URLs or paths will be matched to
          different components of the application.  */}
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