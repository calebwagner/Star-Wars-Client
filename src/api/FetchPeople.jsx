 import axios from 'axios';

 export function fetchPeople() {
     let people = [];
     // first page
     return axios("https://swapi.py4e.com/api/people")
         .then(response => {
             // collect people from first page
             people = response.data.results;
             return response.data.count;
         })
         .then(count => {
             // exclude the first request
             const numberOfPagesLeft = Math.ceil((count - 1) / 10);
             let promises = [];
             // start at page 2
             for (let i = 2; i <= numberOfPagesLeft; i++) {
                 promises.push(axios(`https://swapi.py4e.com/api/people?page=${i}`));
             }
             return Promise.all(promises);
         })
         .then(response => {
             // get the rest records - pages 2 through n.
             people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
             return people;
         })
         .catch(error => console.log(`Issue with retrieving people with ${error}`));
 }