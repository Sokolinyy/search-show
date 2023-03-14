import { Link } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { useContext } from "react";

const SearchResult = () => {
  const { data } = useContext(SearchContext);

  return (
    <main className="main">
      <ul className="search-result">
        {/* If there any data, which coming from SearchResult.tsx
         map through array, and give each item key of "item id" to 
         generate Link for each search result, (every show in has some unique id)
         then create list item with name of search result, if there has no data,
         set data to empty string  */}
        {data
          ? data.map((item) => (
              <Link key={item.id} to={`/${item.id}`} >
                <li className="search-list-result">{item.name}</li>
              </Link>
            ))
          : ""}
      </ul>
    </main>
  );
};

export default SearchResult;
