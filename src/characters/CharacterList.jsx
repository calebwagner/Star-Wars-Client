import React, { useContext, useEffect } from "react";
import { CharacterDetail } from "./CharacterDetail";
import { SwApiContext } from "./StarWarsProvider";

export const CharacterList = () => {
  const { characters, getCharacters } = useContext(SwApiContext);

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <>
      <div className="">
        {characters.map((character) => (
          <CharacterDetail key={character.id} character={character} />
        ))}
      </div>
    </>
  );
};
