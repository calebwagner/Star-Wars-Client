import React, { useState, createContext } from "react";

export const SwapiContext = createContext();

export const SwapiProvider = (props) => {
    const [characters, setCharacters] = useState([]);


    const getCharacters = () => {
      return fetch("https://swapi.dev/api/people/", {
      })
        .then((res) => res.json())
        .then((data) => setCharacters(data));
    };

    const getCharacterById = (id) => {
      return fetch(`https://swapi.dev/api/people/${id}`, {
      }).then((res) => res.json());
    };

    return (
      <SwapiContext.Provider
        value={{
          characters,
          getCharacters,
          getCharacterById
        }}
      >
        {props.children}
      </SwapiContext.Provider>
    );
  };
