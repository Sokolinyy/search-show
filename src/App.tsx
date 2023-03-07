import Header from "./components/Header"
import Main from "./components/Main";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState<string[]>([]);

  return (
    <div className="App">
      <Header setSearchResults={setSearchResults} />
      <Main searchResults={searchResults} />
    </div>
  )
}

export default App
