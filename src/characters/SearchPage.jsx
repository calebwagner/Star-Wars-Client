import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { swapiModule } from "./swapi";


export const SearchPage = () => {

  const [people, setPeople] = useState([])
  const [searchParams, setSearchParams] = useSearchParams({});

  const characterSearch = (people, query) => {
    if (!query) {return ;}

    return people.filter((person) => {
        const characterName = person.name.toLowerCase();
        return characterName.includes(query.toLowerCase());
    });
};

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const charactersSearched = characterSearch(people, searchQuery) ? characterSearch(people, searchQuery): [];

  useEffect(() => {
    swapiModule.getPeople({search: charactersSearched}, (data) => {
        setPeople(data.results)
        setSearchParams(data.results)
      })
  }, []);


  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
        <div className="character-list">
        {charactersSearched.map((people, index) => (
          <Profile key={index} character={people} />
        ))}
      </div>
    </>
  );
};
