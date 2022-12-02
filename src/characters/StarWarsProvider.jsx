import React, { useState, createContext } from "react";

export const SwApiContext = createContext();

export const StarWarsProvider = (props) => {
    const [characters, setCharacters] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");

    const getCharacters = () => {
      // return fetch("https://swapi.dev/api/people/", {
        return fetch("https://swapi.py4e.com/api/people/", {
      })
        .then((res) => res.json())
        .then((data) => setCharacters(data.results)
        );
    };

    const getCharacterById = (id) => {
      return fetch(`https://swapi.dev/api/people/${id}`, {
      }).then((res) => res.json());
    };

    return (
      <SwApiContext.Provider
        value={{
          characters,
          getCharacters,
          getCharacterById,
          searchTerms,
          setSearchTerms
        }}
      >
        {props.children}
      </SwApiContext.Provider>
    );
  };
