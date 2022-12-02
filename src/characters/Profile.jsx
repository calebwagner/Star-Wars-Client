import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { SwApiContext } from "./StarWarsProvider";

export const Profile = () => {
  const { characters, getCharacters, getCharacterById } = useContext(SwApiContext);

  console.log("In Profile page!!!!!!")

  useEffect(() => {
    // getCharacters();
    // getCharacterById(10)
  }, []);

  return (
    <>
        <div className="">
            Hi there!
        </div>
    </>
  );
};
