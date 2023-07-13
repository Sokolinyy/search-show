import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AbortController from "abort-controller";

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
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const showPromise = fetch(`https://api.tvmaze.com/shows/${id}`);
        const timeoutPromise = new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 5000)
        );

        const showResponse = (await Promise.race([
          showPromise,
          timeoutPromise,
        ])) as Response;

        if (!showResponse.ok) {
          throw new Error("Failed to fetch show data");
        }

        const showData = (await showResponse.json()) as Show;
        setShow(showData);
      } catch (error) {
        if (error.message === "Request timeout") {
          console.log("Request timed out. Please try again later.");
        } else {
          console.log(error);
        }
      }
    };

    const fetchEpisodesData = async () => {
      try {
        const episodesPromise = fetch(
          `https://api.tvmaze.com/shows/${id}/episodes`
        );
        const timeoutPromise = new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 5000)
        );

        const episodesResponse = (await Promise.race([
          episodesPromise,
          timeoutPromise,
        ])) as Response;

        if (!episodesResponse.ok) {
          throw new Error("Failed to fetch episodes data");
        }

        const episodesData = (await episodesResponse.json()) as Episode[];
        setEpisodes(episodesData);
      } catch (error) {
        if (error.message === "Request timeout") {
          console.log("Request timed out. Please try again later.");
        } else {
          console.log(error);
        }
      }
    };

    fetchShowData();
    fetchEpisodesData();
  }, [id]);

  const seasons = Array.from(
    new Set(episodes.map((episode) => episode.season))
  );

  console.log(show);

  return (
    <>
      {show ? (
        <article className="Shows">
          <div className="show-detail-container">
            <div className="show-image-container">
              {!show.image?.medium ? (
                <p>There is no image...</p>
              ) : (
                <img
                  className="show-image"
                  src={show.image.medium}
                  alt={show.name}
                />
              )}
            </div>
            <div className="show-info-container">
              <h1 className="show-name">{show.name}</h1>
              <p className="runtime">
                Average runtime: {show.averageRuntime} min
              </p>
              <p className="rating">
                Rating: {show.rating.average ? show.rating.average : "Unknown"}
              </p>
              <p className="status">Status: {show.status}</p>
              <p
                className="description"
                dangerouslySetInnerHTML={{ __html: show.summary }}
              />
            </div>
          </div>
          <div className="season-btn-box">
            {seasons.map((season) => (
              <button
                className="season-btn"
                key={season}
                onClick={() =>
                  setSelectedSeason((prevSeason) =>
                    prevSeason === season ? null : season
                  )
                }
              >
                Season {season}
              </button>
            ))}
          </div>

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
                  {episodes
                    .filter((episode) => episode.season === selectedSeason)
                    .map((episode) => (
                      <tr key={episode.id}>
                        <td>{episode.number}</td>
                        <td>{episode.name}</td>
                        <td>{episode.runtime} min</td>
                        <td>
                          {episode.rating.average
                            ? episode.rating.average
                            : "-"}
                        </td>
                        <td>
                          {new Date(episode.airdate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </article>
      ) : (
        <div>No information available for this show.</div>
      )}
    </>
  );
};

export default Shows;
