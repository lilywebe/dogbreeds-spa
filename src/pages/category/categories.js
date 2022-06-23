import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation, Outlet} from "react-router-dom";
import './category.css';
import React from 'react';
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {Link} from "react-router-dom";
import Pagination from "./pagination";

const Categories = () => {
    const {user} = useAuth();
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Categories");
    const [url, setUrl] = useState(settings.baseApiUrl + "/categories?limit=5&offset=0&sort=categoryName:asc");
    const {
        error,
        isLoading,
        data: categories
    } = useAxios(url, "GET", {Authorization:`Bearer ${user.jwt}`}); ;
    useEffect(() => {
        setSubHeading("All categories");
    }, [pathname]);


    return (
        <div>
            <div>
                <div className="main-heading">
                    <div className="container">Categories</div>
                </div>
                <div className="sub-heading">
                    <div className="container">{subHeading}</div>
                </div>
                <div className="main-content container">
                    {error && <div>{error}</div>}
                    {isLoading && <div className="image-loading">
                        Please wait while data is being loaded
                        <img src={require(`../loading.gif`)} alt="Loading ......"/>
                    </div>}

                    {categories && <div className="category-container">
                        <div>
                        <div className="category-list">
                            {categories.data.map((category) => (
                                <NavLink key={category.categoryID}
                                         className={({isActive}) => isActive ? "active" : ""}
                                         to={`/categories/${category.categoryID}`}>
                                    <span>&nbsp;</span><div>{category.categoryName}</div>
                                </NavLink>
                            ))}

                        </div>
                        {categories && <Pagination categories={categories} setUrl={setUrl}/>}
                        </div>

                        <div className="category-item">
                            <Outlet context={[subHeading, setSubHeading]}/>
                        </div>

                    </div>}


                </div>
            </div>
        </div>
    );
};

export default Categories;
