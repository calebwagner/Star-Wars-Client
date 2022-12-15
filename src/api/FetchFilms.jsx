import axios from 'axios'

export function fetchFilms() {
  let films = []
  // first page
  return axios('https://swapi.py4e.com/api/films')
    .then((response) => {
      // collect films from first page
      films = response.data.results
      return response.data.count
    })
    .then((count) => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10)
      let promises = []
      // start at page 2
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.py4e.com/api/films?page=${i}`))
      }
      return Promise.all(promises)
    })
    .then((response) => {
      // get the rest records - pages 2 through n.
      films = response.reduce((acc, data) => [...acc, ...data.data.results], films)
      return films
    })
    .catch((error) => console.log(`Issue with retrieving films with ${error}`))
}
