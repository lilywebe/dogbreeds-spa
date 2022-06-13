/*
Name: Lily Weber
Date: 13-June-2022
File: Layout.js
Description: create the page layout.
*/

import {Outlet} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;