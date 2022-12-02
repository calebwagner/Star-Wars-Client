import React, { useContext, useEffect, useState } from "react";
import { CharacterDetail } from "./CharacterDetail";
import { SearchBar } from "./SearchBar";
import { SwApiContext } from "./StarWarsProvider";

export const CharacterList = () => {
  const { characters, getCharacters, searchTerms, setSearchTerms } = useContext(SwApiContext);

  const [characterSearch, setCharacterSearch] = useState([]);


  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    if (searchTerms !== "") {
      const characterSearch = characters.filter((character) =>
      character.name.toLowerCase().includes(searchTerms.toLowerCase())
      );
      setCharacterSearch(characterSearch);
    } else {
        setCharacterSearch(characters)
    }
  }, [searchTerms, characters]);

  return (
    <>
      <input
        className="search-bar"
        type="text"
        placeholder="character search"
        onKeyUp={(event) => setSearchTerms(event.target.value)} />
      <div className="character-list">
        {characterSearch.map((character) => (
          <CharacterDetail key={character.id} character={character} />
        ))}
      </div>
    </>
  );
};
