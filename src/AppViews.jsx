import React from "react";
import { Route, Routes } from "react-router-dom";
import { CharacterList } from "./characters/CharacterList";

export const AppViews = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={<CharacterList />} />
        </Routes>
        </>
    )
}