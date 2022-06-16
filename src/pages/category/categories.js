import {settings} from "../../config/config";
import {useState, useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import './category.css';
import useXmlHttp from "../../services/useXmlHttp";
import React from 'react';
import {useAuth} from "../../services/useAuth";

const Categories = () => {
    const {user} = useAuth();
    const {pathname} = useLocation();
    const [subHeading, setSubHeading] = useState("All Categories");
    const url = settings.baseApiUrl + "/categories";
    const {
        error,
        isLoading,
        data: categories
    } = useXmlHttp(url, "GET", {Authorization:`Bearer ${user.jwt}`}); ;
    useEffect(() => {
        setSubHeading("All categories");
    }, [pathname]);

    
    return (
        <div>
            <div>
                <div className="main-heading">
                    <div className="container">Category</div>
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
                        <div className="category-list">
                            {categories.map((category) => (
                                <NavLink key={category.categoryID}
                                         className={({isActive}) => isActive ? "active" : ""}
                                         to={`/categories/${category.categoryID}`}>
                                    <span>&nbsp;</span><div>{category.categoryName}</div>
                                </NavLink>
                            ))}
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