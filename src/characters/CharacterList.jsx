import React, { useContext, useEffect, useState } from "react";
import { CharacterDetail } from "./CharacterDetail";
import { SearchBar } from "./SearchBar";
import { SwApiContext } from "./StarWarsProvider";


export const CharacterList = () => {
  const { characters, getCharacters } = useContext(SwApiContext);

  const characterSearch = (characters, query) => {
    if (!query) {
        return characters;
    }

    return characters.filter((character) => {
        const characterName = character.name.toLowerCase();
        return characterName.includes(query.toLowerCase());
    });
};

  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');
  const [searchQuery, setSearchQuery] = useState(query || '');
  const charactersSearched = characterSearch(characters, searchQuery);


  useEffect(() => {
    getCharacters();
  }, []);


  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className="character-list">
        {charactersSearched.map((character) => (
          <CharacterDetail key={character.id} character={character} />
        ))}
      </div>
    </>
  );
};
