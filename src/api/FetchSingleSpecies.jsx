import axios from 'axios'

export function fetchSingleSpecies(character) {
  let url = character ? character.species[0] : null
  const speciesId = url ? /(?<=species\/)\d*/.exec(url) : null
  return axios(`https://swapi.py4e.com/api/species/${speciesId}/`)
    .then((response) => {
      let species = response.data.name
      return species
    })
    .catch((error) => console.log(`Issue with retrieving species with ${error}`))
}
