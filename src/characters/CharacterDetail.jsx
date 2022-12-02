import React from "react";
import { Link, useParams } from "react-router-dom";

export const CharacterDetail = ({ character }) => {

    console.log(character.url)

  const { characterId } = useParams();


  return (
    <>
        <div className="">
            <div className="">
                <Link to={`${character.url}`}>
                    {character.name}
                </Link>
            </div>
        </div>
    </>
  );
};
