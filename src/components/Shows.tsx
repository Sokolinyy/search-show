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
    average: number;
  };
  status: string;
  summary: string;
};

type Episode = {
  id: number;
  name: string;
  airdate: string;
  number: number;
  season: number;
  runtime: number;
  rating: {
    average: number;
  };
};

const Shows = (props: Props) => {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show>();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data));

    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((response) => response.json())
      .then((data) => setEpisodes(data));
  }, [id]);

  if (!episodes.length || !show) {
    return (
      <div style={{ display: "flex", fontSize: 40, justifyContent: "center" }}>
        Loading...
      </div>
    );
  }

  const seasons = episodes.reduce<number[]>((acc, episode) => {
    if (!acc.includes(episode.season)) {
      acc.push(episode.season);
    }
    return acc;
  }, []);

  return (
    <article className="Shows">
      <div className="show-detail-container">
        <div className="show-image-container">
          <img className="show-image" src={show.image.medium} alt={show.name} />
        </div>
        <div className="show-info-container">
        <h1 className="show-name">{show.name}</h1>
          <p className="runtime">Average runtime: {show.averageRuntime} min</p>
          <p className="rating">Rating: {show.rating.average}</p>
          <p className="status">Status: {show.status}</p>
          <p className="description" dangerouslySetInnerHTML={{ __html: show.summary }} />
        </div>
      </div>

      <div className="season-btn-box">
            {seasons.map((season) => (
              <button
                className="season-btn"
                key={season}
                onClick={() =>
                  setSelectedSeason(selectedSeason === season ? null : season)
                }
              >
                Season {season}
              </button>
            ))}
          </div>

      {selectedSeason && (
        <table className="seasons-detail">
            <thead>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Runtime</th>
                <th>Rating</th>
                <th>Release Date</th>
              </tr>
            </thead>
            <tbody>
              {episodes
                .filter((episode) => episode.season === selectedSeason)
                .map((episode) => (
                  <tr key={episode.id}>
                      <td>{episode.number}</td>
                      <td>{episode.name}</td>
                      <td>{episode.runtime} min</td>
                      <td>{episode.rating.average}</td>
                      <td>{episode.airdate}</td>
                  </tr>
                ))}
            </tbody>
        </table>
      )}
    </article>
  );
};

export default Shows;
