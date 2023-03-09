import { Link } from "react-router-dom";
import { SearchContext } from "./SearchContext";
import { useContext } from "react";

const SearchResult = () => {
  const { data } = useContext(SearchContext);

  return (
    <main className="main">
      <ul className="search-result">
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
