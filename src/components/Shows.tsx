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
  // Component that will fetch data about show
  // and their episodes, and render that info

  // Uses the useParams hook from react-router-dom
  // to extract the id parameter from the current URL.
  // The extracted id value is stored in the
  // id constant using object destructuring syntax.
  const { id } = useParams<{ id: string }>();
  // State for stored fetched data about show
  const [show, setShow] = useState<Show>();
  // State for stored fetched data about episodes
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  // State for checking, what season was clicked
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  useEffect(() => {
    // Fetch data and store it in show state
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((data) => setShow(data));

    // Fetch data and store it in episode state
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((response) => response.json())
      .then((data) => setEpisodes(data));
  }, [id]);

  // If there is no data, render "Loading"
  if (!episodes.length || !show) {
    return (
      <div
        style={{
          display: "flex",
          fontSize: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  // Create an array of all unique seasons for the fetched episodes using the reduce method.
  const seasons = episodes.reduce<number[]>((acc, episode) => {
    // Check if the current episode's season is already in the accumulator array.
    if (!acc.includes(episode.season)) {
      // If not, add it to the accumulator array.
      acc.push(episode.season);
    }
    // Return the updated accumulator array for the next iteration.
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
          <p
            className="description"
            dangerouslySetInnerHTML={{ __html: show.summary }}
          />
        </div>
      </div>

      {/* Create button for each season with name "Season" + selectedSeason */}
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

      {/* If button selectedSeason was clicked, render table, in this table
       display info about: number of series, name, runtime, their rating, 
       and release date  */}
      {selectedSeason && (
        <div className="table-container">
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
              {/* Render a table of episodes for the selected season. */}
              {episodes
              // Filter the array of episodes to only include those with the selected season.
                .filter((episode) => episode.season === selectedSeason)
                .map((episode) => (
                  // Map the filtered array to an array of table rows.
                  <tr key={episode.id}>
                    <td>{episode.number}</td>
                    <td>{episode.name}</td>
                    <td>{episode.runtime} min</td>
                    <td>{episode.rating.average}</td>
                    <td>
                      {/* Format the airdate as "MMM/DD/YYYY"
                       using toLocaleDateString(). */}
                      {new Date(episode.airdate)
                        .toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })
                        // Replace all commas and spaces to slash(/)
                        .replaceAll(", ", "/")
                        .replace(" ", "/")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
};

export default Shows;
