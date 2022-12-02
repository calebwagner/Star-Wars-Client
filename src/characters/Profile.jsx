import React, { useEffect, useState } from "react";
import { swapiModule } from "./swapi";

export const Profile = ({character}) => {

const [species, setSpecies] = useState(null)
const [allFilms, setAllFilms] = useState([])


  useEffect(() => {
    let url = character.species[0]
    let urlSplit = url.split("https://swapi.py4e.com/api/species/")
    let splitAgain = urlSplit[1].split('')
    let speciesId = splitAgain[0]
    swapiModule.getSpecies(speciesId, (data) => {
        setSpecies(data.name)
      })

      swapiModule.getFilms(function(data) {
        setAllFilms(data.results)
    });

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
    </>
  );
};
