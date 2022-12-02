import React from "react";
import { Route, Routes } from "react-router-dom";
import { SearchPage } from "./characters/SearchPage";

export const AppViews = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<SearchPage />} />
        </Routes>
        </>
    )
}