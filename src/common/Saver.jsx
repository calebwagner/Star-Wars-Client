import React, { useEffect, useState } from "react";
import { fetchStarships } from "../api/FetchStarships";
import { fetchFilms } from "../api/FetchFilms";
import { fetchSingleSpecies } from "../api/FetchSingleSpecies";


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

    // optimize: get rid of and use regex
  const parseFilmUrls = () => {
    let parsedFilmUrlsArray = []
    let characterFilms = character.films
    characterFilms.forEach(filmUrl =>  {
        let splitUrl = filmUrl.split("https://swapi.py4e.com/api/films/")
        let filmIdWithSlash = splitUrl[1]
        let splitFilmId = filmIdWithSlash.split("")
        let filmId = splitFilmId[0]
        parsedFilmUrlsArray.push(filmId)
    });
    return parsedFilmUrlsArray
  }

  const getId = (url) => {
    const match = /(?<=starships\/)\d*/.exec(url)
    return match ? match[0] : null;

  }

  // optimize: get rid of and use regex
  const parseStarshipUrlsFromPerson = () => {
    let starshipUrlIds = []
    let personStarships = character.starships
    personStarships.forEach(starshipUrl =>  {
        const parsedStarshipId = getId(starshipUrl)
        starshipUrlIds.push(parsedStarshipId)
    });
    return starshipUrlIds
  }

  // optimize: using regex
  const matchPersonToStarships = () => {
    let matchedStarships = [];
    const starshipsFlown = parseStarshipUrlsFromPerson()

    // optimize: use hash table for O(n) time
    for (let i = 0; i < starships.length; i++) {
        const starship = starships[i];
        for (let j = 0; j < starshipsFlown.length; j++) {
            const personStarship = starshipsFlown[j];
            const starshipUrl = starship.url

            let parsedStarshipId = getId(starshipUrl)

            if (parsedStarshipId == personStarship) {
                matchedStarships.push(starship.name)
            }
        }
    }
    return matchedStarships
  }

  // optimize: using regex
  const matchPersonToFilms = () => {
    let matchedFilms = [];
    const filmsArray = parseFilmUrls()

    // optimize: use hash table for O(n) time
    for (let i = 0; i < allFilms.length; i++) {
        const allFilm = allFilms[i];
        for (let j = 0; j < filmsArray.length; j++) {
            const personFilm = filmsArray[j];
            if (allFilm.episode_id == personFilm) {
                matchedFilms.push(allFilm.title)
            }
        }
    }
    return matchedFilms
  }

  let matchPersonToFilm = matchPersonToFilms().length ? matchPersonToFilms() : ["films not present"];

  let matchPersonToStarship = matchPersonToStarships().length ? matchPersonToStarships() : ["No starships flown"];

  return (
    <>
    <table>
      <tr>
        <th>{character.name || "character name missing"}</th>
      </tr>
      <tr>
        <td>Height: {character.height || "not available"}</td>
        <td>Weight: {character.mass || "not available"}</td>
        <td>Hair Color: {character.hair_color || "not available"}</td>
        <td>Date of Birth: {character.birth_year || "not available"}</td>
        <td>Species: {species || "not available"}</td>
      </tr>
    </table>

    <table>
      <tr>
        <td>Films:
            {matchPersonToFilm.map((film, index) => {
               return (
                <div key={index}>{film}</div>
               )
            })}
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>Starships Flown:
            {matchPersonToStarship.map((starship, index) => {
               return (
                <div key={index}>{starship}</div>
               )
            })}
        </td>
      </tr>
    </table>
    </>
  );
};
