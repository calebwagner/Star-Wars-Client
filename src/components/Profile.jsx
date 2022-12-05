import React, { useEffect, useState } from "react";
import { fetchStarships } from "../api/FetchStarships";
import { fetchFilms } from "../api/FetchFilms";
import { fetchSingleSpecies } from "../api/FetchSingleSpecies";
import { Table } from "react-bootstrap";


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
    let matchedStarships = [];
    const starshipsFlown = parseStarshipUrlsFromPerson()

    // optimize: for O(n) time
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
    // console.log("matchedFilms ===> ", matchedFilms)
    return matchedFilms
  }

  let matchPersonToFilm = matchPersonToFilms().length ? matchPersonToFilms() : ["films not present"];

  let matchPersonToStarship = matchPersonToStarships().length ? matchPersonToStarships() : ["No starships flown"];

  return (
    <>
    <div class="p-5">
      <div class="card-body d-flex justify-content-center flex-nowrap">
        <h1 class="card-title text-white name">
          {character.name || "character name missing"}
        </h1>
      </div>
    </div>

    <div class="row p-2">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{character.height || "not available"}</h5>
            <p class="card-text">height</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{character.mass || "not available"}</h5>
            <p class="card-text">weight</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row p-2">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{character.hair_color || "not available"}</h5>
            <p class="card-text">hair color</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{character.eye_color || "not available"}</h5>
            <p class="card-text">eye color</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row p-2">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{character.birth_year || "not available"}</h5>
            <p class="card-text">date of birth</p>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{species || "not available"}</h5>
            <p class="card-text">species</p>
          </div>
        </div>
      </div>
    </div>

<div className="d-flex">

<div className="w-50 p-2 mx-auto">
    <div class="card">
      <div class="card-body mx-auto" >
        <h5 class="card-title">
            Films:
        </h5>
      </div>
    </div>
        {matchPersonToFilm.map((film, index) => {
               return (
                <div class="card p-2">
                <div class="card-body p-2 mx-auto">
                <p key={index} class="card-text">Episode {film.episode}: {film.title || "not available"}</p>
              </div>
              </div>
               )
            })}

</div>

<div className="w-50 p-2 mx-auto">
    <div class="card">
          <div class="card-body mx-auto" >
            <h5 class="card-title">
              Starships Flown:
            </h5>
          </div>
    </div>

{matchPersonToStarship.map((starship, index) => {
               return (
                <div class="card p-2">
                <div class="card-body p-2 mx-auto">
                <p key={index} class="card-text">{starship || "not available"}</p>
              </div>
              </div>
               )
            })}

</div>
</div>
    </>
  );
};
