import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams, Link, useOutletContext, Outlet} from "react-router-dom";

import './category.css';

import React from 'react';
import {useAuth} from "../../services/useAuth";

const Category = () => {

    const {user} = useAuth();
    const [subheading, setSubHeading] = useOutletContext();
    const {categoryID} = useParams();
    const url = settings.baseApiUrl + "/categories/" + categoryID;
    const {
        error,
        isLoading,
        data: category
    } = useXmlHttp(url, "GET", {Authorization:`Bearer ${user.jwt}`}); ;
    //} = useXmlHttp(url);

    return (
        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                </div>}
            {category && <>
                {setSubHeading(category.categoryName)}
                <div className="category-details">
                    <div className="category-name">{category.categoryName}</div>
                    <div className="category-info">
                        <div><strong>Description</strong>: {category.categoryDesc}</div>

                    </div>
                </div>
                <div className="category-breeds">
                   <Outlet/>
                </div>
            </>}
        </>
    );
};

export default Category;