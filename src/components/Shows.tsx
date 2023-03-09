import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Props = {};

type Show = {
  id: number;
  name: string;
  averageRuntime: number;
  image: {
    medium: string;
    original: string;
  };
  rating: {
    average: number
  }
  status: string;
  summary: string;
};

const Shows = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show>();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data));
  }, [id]);

  if (!show) {
    return <div style={{ display: "flex", fontSize: 40, justifyContent: "center"}}>Search something...</div>;
  }

  return (
    <article className="Shows">
      <h1>{show.name}</h1>
      <img src={show.image.medium} alt={show.name} />
      <p>{show.averageRuntime}</p>
      <p>{show.rating.average}</p>
      <p>{show.status}</p>
      <p dangerouslySetInnerHTML={{ __html: show.summary }} />
    </article>
  );
};

export default Shows;
