# React Code Review
I looked at this project with a mid-level FE dev in mind (hopfully it isn't overly harsh haha). I marked criticality for each comment to help understand where I rank things. Typically anything more than 2-3 High to Critical issues we tend to pass on them. It was overall pretty solid just a few comments.

## Overall Comments
- [Low] Delete `index.css` if it's not being used
- [Low] README looks pretty good. Only thing I would suggest is a "Getting Started" section for someone who wants to clone it down and try it
- [Medium] May just be because it was a quick turn around on code test, but I would like to see more comments specifically around your helpers  and your axios calls
- Remember your basics:
  - KISS
  - DRY

## API Calls
Few things:
- [Medium] Create a base API instance so you can define the URL only once and just update the path
- [Medium] Doesn't really need to be `.jsx` files and can just be regular js/ts files

``` javascriptxs
// ./api/index.j
import axios from "axios";

export default axios.create({
  baseURL: "https://swapi.py4e.com/api/",
  headers: {
    "Content-type": "application/json"
  }
});
```

``` javascript
// ./api/fetchFilms.js
import API from './'

const fetchFilms () => {
    API.get('films')
    //...
}

export default fetchFilms;
```

## src/components/Profile.jsx
General Notes:
- [High] Fomatting is kinda weird. Would recommend leveraging Prettier/.editorconfig to keep everything nicely formatted
- [High] Prefer `const` to `let` when initializing variables (`let matchPersonToFilm` -> `const matchPersonToFilm`)
- [Critical] Create a card component and have props for title and body. You could also use the children prop if you needed more customizability

``` javascript
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
</div>
```

## src/components/__tests__/Profile.test.jsx
- [Low/Medium] Maybe create a mock file for this since it could potentially be used elsewhere
``` json
{
  "name": "Luke Skywalker",
  "height": "172",
  "mass": "77",
  "hair_color": "blond",
  "skin_color": "fair",
  "eye_color": "blue",
  "birth_year": "19BBY",
  "gender": "male",
  "homeworld": "https://swapi.dev/api/planets/1/",
  "films": [ ... ],
  "species": [],
  "vehicles": [ ... ],
  "starships": [ ... ],
  "created": "2014-12-09T13:50:51.644000Z",
  "edited": "2014-12-20T21:17:56.891000Z",
  "url": "https://swapi.dev/api/people/1/"
}
```

## src/components/SearchBar.jsx
Looks good nothing to really comment on

## src/components/__tests__/SearchBar.test.jsx
Looks good no comments

## src/components/SearchPage.jsx
- [High] Formatting issues
- [Medium] I'd put this in a hook since it's possible it could be used elsewhere in the future

``` javascript
const [people, setPeople] = useState([])

  const characterSearch = (people, query) => {
    if (!query) {return ;}

    return people.filter((person) => {
        const characterName = person.name.toLowerCase();
        return characterName.includes(query.toLowerCase());
    });
};

  const { search } = window.location;
  const queryUrl = new URLSearchParams(search)
  const query = queryUrl.get('s');

  const [searchQuery, setSearchQuery] = useState(query ||'');
  const charactersSearched = characterSearch(people, query) ? characterSearch(people, query): [];

  useEffect(() => {
    fetchPeople()
    .then(output => setPeople(output))
  }, []);
  ```

## src/components/__tests__/SearchPage.test.jsx
- [Low/Medium] Split out into a mock file since it could potentially be reused
``` json
  [
    {
      "name": "Luke Skywalker",
      "height": "172",
      "mass": "77",
      "hair_color": "blond",
      "skin_color": "fair'",
      "eye_color": "blue",
      "birth_year": "19BBY",
      "gender": "male",
    },
]
```

## src/helpers/matcherFunctions.js
- [Medium] Seems like both of these helpers could be simplified. These both look like you're merging two array of objects based on a key.

``` javascript
const mergeArrays = () => {
  arrayOne.forEach((item, i) => {
    const matchedFound = arrayTwo.findIndex(a => a.id === item.id);
    arrayOne[i] = {
      ...item,
      ...matchedFound,
    }
  });
};
```

## src/helpers/parserFunctions.js
- [Medium] you could probably simplify to just grab the last index of the url
``` javascript
export const parsedSubjectUrls = (url) => {
    let ids = []
    url.forEach(url =>  ids.push(url.substring(url.lastIndexOf('/') + 1)));
    return ids
}
```