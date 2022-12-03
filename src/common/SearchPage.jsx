import React, { useEffect, useState } from "react";
import { Profile } from "./Profile";
import { SearchBar } from "./SearchBar";
import { fetchPeople } from "../api/FetchPeople";



export const SearchPage = () => {

  const [people, setPeople] = useState([])

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
    fetchPeople()
    .then(output => setPeople(output))
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
