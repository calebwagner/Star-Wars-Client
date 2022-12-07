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


  const getId = (url) => {
    const match = /(?<=starships\/)\d*/.exec(url)
    return match ? match[0] : null;

  }

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
    personStarships.forEach(url =>  {
        const parsedStarshipId = /(?<=starships\/)\d*/.exec(url)
        starshipUrlIds.push(parsedStarshipId)
    });
    return starshipUrlIds
  }

  // fix: create universal parse function
  const parseUrls = (item, endpoint) => {
    let itemIds = []
    let itemEndpoint = character.item
    itemEndpoint.forEach(url =>  {
        const parsedUrl = /(?<=starships\/)\d*/.exec(url)
        itemIds.push(parsedUrl)
    });
    return itemIds
  }

  const matchPersonToStarships = () => {
    const starshipsFlown = parseStarshipUrlsFromPerson()
    const starshipsMap = new Map();

    for (const starship of starships) {
      const starshipUrl = starship.url
      let parsedStarshipId = getId(starshipUrl)
      starshipsMap.set(parseInt(parsedStarshipId), starship);
    }
    const characterStarshipMap = new Map();
    for (const  starshipFlown of starshipsFlown) {
      let id = parseInt(starshipFlown[0])
      characterStarshipMap.set(id, starshipsFlown);
    }

    const result = [];
    for (const [id, obj] of starshipsMap) {
      if (characterStarshipMap.has(id)) {
        result.push(obj.name);
      }
    }

    return result;
}

  const matchPersonToFilms = () => {
    let matchedFilms = [];
    const filmsArray = parseFilmUrls()

    // optimize: for O(n) time
    for (let i = 0; i < allFilms.length; i++) {
        const allFilm = allFilms[i];
        for (let j = 0; j < filmsArray.length; j++) {
            const personFilm = filmsArray[j];
            if (allFilm.episode_id == personFilm) {
                matchedFilms.push(
                  {
                    title: allFilm.title,
                    episode: allFilm.episode_id
                  })
            }
        }
    }
    return matchedFilms
  }

  let matchPersonToFilm = matchPersonToFilms().length ? matchPersonToFilms() : ["films not present"];

  let matchPersonToStarship = matchPersonToStarships().length ? matchPersonToStarships() : ["No starships flown"];

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
