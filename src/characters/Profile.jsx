import React, { useEffect, useState } from "react";
import { swapiModule } from "./swapi";

export const Profile = ({character}) => {

const [species, setSpecies] = useState(null)

  useEffect(() => {
    let url = character.species[0]
    let urlSplit = url.split("https://swapi.py4e.com/api/species/")
    let splitAgain = urlSplit[1].split('')
    let speciesId = splitAgain[0]
    swapiModule.getSpecies(speciesId, (data) => {
        setSpecies(data.name)
      })
  }, []);


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
    </>
  );
};
