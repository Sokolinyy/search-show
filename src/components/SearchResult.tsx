import { useState } from "react";
import NewPage from "./NewPage";

type Props = {
  data?: {
    id: number;
    name: string;
  }[];
};

const SearchResult = ({ data }: Props) => {
  const isEmpty = () => {
    if (data?.length === 0) {
      return <li>Not found</li>;
    }
  };

  const [displayDetail, setDisplayDetail] = useState(false)

  const showDetail = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setDisplayDetail(true)
  };

  return (
    <main className="main">
      <ul className="search-result">
        {data && showDetail
          ? data.map((item) => (
              <a key={item.id} onClick={showDetail} href={`https://api.tvmaze.com/shows/${item.id}` }>
                <li className="search-list-result">{item.name}</li>
              </a>
            ))
          : isEmpty()}
      </ul>
    </main>
  );
};

export default SearchResult;
