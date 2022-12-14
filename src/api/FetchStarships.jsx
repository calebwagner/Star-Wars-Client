import axios from 'axios'

export function fetchStarships() {
  let starships = []
  // first page
  return axios('https://swapi.py4e.com/api/starships')
    .then((response) => {
      // collect people from first page
      starships = response.data.results
      return response.data.count
    })
    .then((count) => {
      // exclude the first request
      const numberOfPagesLeft = Math.ceil((count - 1) / 10)
      let promises = []
      // start at page 2
      for (let i = 2; i <= numberOfPagesLeft; i++) {
        promises.push(axios(`https://swapi.py4e.com/api/starships?page=${i}`))
      }
      return Promise.all(promises)
    })
    .then((response) => {
      // get the rest records - pages 2 through n.
      starships = response.reduce((acc, data) => [...acc, ...data.data.results], starships)
      return starships
    })
    .catch((error) => console.log(`Issue with retrieving starships with ${error}`))
}
