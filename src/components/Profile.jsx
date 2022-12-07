import React, { useEffect, useState } from "react";
import { fetchStarships } from "../api/FetchStarships";
import { fetchFilms } from "../api/FetchFilms";
import { fetchSingleSpecies } from "../api/FetchSingleSpecies";
import { matchPersonToStarships, matchPersonToFilms } from "../helpers/matcherFunctions";


export const Profile = ({character}) => {

const [species, setSpecies] = useState(null)
const [allFilms, setAllFilms] = useState([])
const [starships, setStarships] = useState([])

  useEffect(() => {
    fetchSingleSpecies(character)
    .then(output => setSpecies(output))

    fetchFilms()
    .then(output => setAllFilms(output))

    fetchStarships()
    .then(output => setStarships(output))
  }, []);

  const parseFilmUrls = () => {
    let parsedFilmUrlsArray = []
    let characterFilms = character.films
    characterFilms.forEach(filmUrl =>  {
        let parseId = /(?<=films\/)\d*/.exec(filmUrl)
        let filmId = parseId[0]
        parsedFilmUrlsArray.push(filmId)
    });
    return parsedFilmUrlsArray
  }

  const parseStarshipUrlsFromPerson = () => {
    let starshipUrlIds = []
    let personStarships = character.starships

    personStarships.forEach(url =>  starshipUrlIds.push(parseUrl(url)));

    return starshipUrlIds
  }

  function parseUrl(url) {
    const matches = url.match(/[^/]+/g);
    const matchId = parseInt(matches.slice(-1)[0])
    return matchId;
  }

  let matchPersonToFilm = matchPersonToFilms(allFilms, parseFilmUrls()).length
    ? matchPersonToFilms(allFilms, parseFilmUrls())
    : ["films not present"];

  let matchPersonToStarship = matchPersonToStarships(starships, parseStarshipUrlsFromPerson()).length
    ? matchPersonToStarships(starships, parseStarshipUrlsFromPerson())
    : ["No starships flown"];

  return (
    <>
    <div className="p-5">
      <div className="card-body d-flex justify-content-center flex-nowrap">
        <h1 className="card-title text-white name">
          {character.name || "character name missing"}
        </h1>
      </div>
    </div>

    <div className="row p-2 d-flex">
      <div className="col-sm-6 d-flex justify-content-around">
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{character.height || "not available"}</h5>
            <p className="card-text">height</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 d-flex justify-content-around">
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{character.mass || "not available"}</h5>
            <p className="card-text">weight</p>
          </div>
        </div>
      </div>
    </div>

    <div className="row p-2">
      <div className="col-sm-6 d-flex justify-content-around">
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{character.hair_color || "not available"}</h5>
            <p className="card-text">hair color</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 d-flex justify-content-around">
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{character.eye_color || "not available"}</h5>
            <p className="card-text">eye color</p>
          </div>
        </div>
      </div>
    </div>

    <div className="row p-2">
      <div className="col-sm-6 d-flex justify-content-around">
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{character.birth_year || "not available"}</h5>
            <p className="card-text">date of birth</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6 d-flex justify-content-around">
        <div className="card w-75">
          <div className="card-body">
            <h5 className="card-title">{species || "not available"}</h5>
            <p className="card-text">species</p>
          </div>
        </div>
      </div>
    </div>

<div className="d-flex">
  <div className="w-50 pt-5 p-2 mx-auto">
      <div className="card">
        <div className="card-body mx-auto">
          <h5 className="card-title">
              Films:
          </h5>
        </div>
      </div>
        {matchPersonToFilm.map((film, index) => {
            return (
              <div key={index} className="card p-2">
                <div className="card-body p-2 mx-auto">
                  <p className="card-text">Episode {film.episode}: {film.title || "not available"}</p>
                </div>
              </div>
                )
              })}
   </div>

  <div className="w-50 pt-5 p-2 mx-auto">
      <div className="card">
          <div className="card-body mx-auto" >
            <h5 className="card-title">
              Starships Flown:
            </h5>
        </div>
  </div>

  {matchPersonToStarship.map((starship, index) => {
    return (
      <div key={index} className="card p-2">
        <div className="card-body p-2 mx-auto">
          <p className="card-text">{starship || "not available"}</p>
        </div>
      </div>
            )
      })}

  </div>
</div>
    </>
  );
};
