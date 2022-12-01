import React from "react";
import { Link } from "react-router-dom";

export const CharacterDetail = ({ character }) => {

  return (
    <>
        <div className="">
            <div className="">
                <Link to={`/${character.url}`}>
                    {character.name}
                </Link>
            </div>
        </div>
    </>
  );
};
