import React from "react";
import { Route, Routes } from "react-router-dom";
import { CharacterList } from "./characters/CharacterList";
import { Profile } from "./characters/Profile";

export const AppViews = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<CharacterList />} />
            {/* <Route path="https://swapi.dev/api/people/:id/" element={<Profile />} /> */}
            <Route path="https://swapi.py4e.com/api/people/:id/" element={<Profile />} />
        </Routes>
        </>
    )
}