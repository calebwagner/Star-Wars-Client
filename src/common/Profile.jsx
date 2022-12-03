import React, { useEffect, useState } from "react";
import { swapiModule } from "./swapi";
import { fetchStarships } from "../api/FetchStarships";
import { fetchFilms } from "../api/FetchFilms";


export const Profile = ({character}) => {

const [species, setSpecies] = useState(null)
const [allFilms, setAllFilms] = useState([])
const [starships, setStarships] = useState([])


  useEffect(() => {
    let url = character.species[0]
    const parsedSpeciesId = getSpecies(url)
    console.log("parsedSpeciesId ----> ", parsedSpeciesId)
    swapiModule.getSpecies(parsedSpeciesId, (data) => {
        setSpecies(data.name)
      })

    fetchFilms()
    .then(output => setAllFilms(output))

    fetchStarships()
    .then(output => setStarships(output))
  }, []);

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

  const getSpecies = (url) => {
    const match = /(?<=species\/)\d*/.exec(url)
    return match ? match[0] : null;
  }

  const getPageNum = (url) => {
    const match = /starships\/\?page=\d/i.exec(url)
    console.log("fffffffffffff ===> ", match)
    return match ? match[0] : null;

  }

  const getId = (url) => {
    const match = /(?<=starships\/)\d*/.exec(url)
    return match ? match[0] : null;

  }

  const parseStarshipUrlsFromPerson = () => {
    let starshipUrlIds = []
    let personStarships = character.starships
    personStarships.forEach(starshipUrl =>  {
        const parsedStarshipId = getId(starshipUrl)
        starshipUrlIds.push(parsedStarshipId)
    });
    return starshipUrlIds
  }

  const matchPersonToStarships = () => {
    let matchedStarships = [];
    const starshipsFlown = parseStarshipUrlsFromPerson()

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

  const matchPersonToFilms = () => {
    let matchedFilms = [];
    const filmsArray = parseFilmUrls()

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
  let matchPersonToFilm = matchPersonToFilms()

  let matchPersonToStarship = matchPersonToStarships();

  return (
    <>
    <table>
      <tr>
        <th>Info on {character.name}</th>
      </tr>
      <tr>
        <td>Height: {character.height}</td>
        <td>Weight: {character.mass}</td>
        <td>Hair Color: {character.hair_color}</td>
        <td>Date of Birth: {character.birth_year}</td>
        <td>Species: {species}</td>
      </tr>
    </table>

    <table>
      <tr>
        <td>Films:
            {matchPersonToFilm.map((film) => {
               return (
                <div>{film}</div>
               )
            })}
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>Starships Flown:
            {matchPersonToStarship.map((starship) => {
               return (
                <div>{starship}</div>
               )
            })}
        </td>
      </tr>
    </table>
    </>
  );
};
