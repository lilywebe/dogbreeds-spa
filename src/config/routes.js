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
import Breed from '../pages/breed/breed';
import Colors from '../pages/color/colors';
import EditColor from "../pages/color/editColor";
import RequireAuth from "../components/RequireAuth";

import {AuthProvider} from "../services/useAuth";
import Signup from "../pages/auth/signup";
import Signout from "../pages/auth/signout";
import Signin from "../pages/auth/signin";



const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
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

                        </Route>


                    </Route>
                    <Route path="breeds" element={
                        <RequireAuth>
                            <Breeds />
                        </RequireAuth>
                    }>


                            <Route path=":breedID" element={<Breed />} />


                    </Route>
                    <Route path="colors" element={
                        <RequireAuth>
                            <Colors />
                        </RequireAuth>
                    }>

                        <Route path=":colorID" element={<EditColor />} />
                    </Route>
                    <Route path="/signin" element={<Signin/>}/>
                    <Route path="/signout" element={<Signout/>}/>
                    <Route path="/signup" element={<Signup/>}/>

                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;
