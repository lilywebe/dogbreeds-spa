/*
Name: Lily Weber
Date: 13-June-2022
File: home.js
Description: create the home page for the app.
*/

import {BrowserRouter,Routes,Route}from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/home";
import NoMatch from "../pages/nomatch";
import Categories from "../pages/category/categories";
import Category from "../pages/category/category";
import Breeds from "../pages/breed/breeds";
import RequireAuth from "../components/RequireAuth";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="categories" element={
                        <RequireAuth>
                            <Categories />
                        </RequireAuth>
                    }>
                        <Route index element={<p>Select a category to view details.</p>}/>
                        <Route path=":categoryID" element={<Category/>} >
                            <Route path="breeds" element={<Breeds/>}/>
                        </Route>
                    <Route path="*" element={<NoMatch/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;