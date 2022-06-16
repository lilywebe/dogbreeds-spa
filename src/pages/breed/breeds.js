import {settings} from "../../config/config";
import useXmlHttp from '../../services/useXmlHttp';
import {useParams} from "react-router-dom";
import './breed.css';

import React from 'react';

const Breeds = () => {

    const {categoryID} = useParams();
    const url = settings.baseApiUrl + "/categories/" + categoryID + "/breeds";
    const {
        error,
        isLoading,
        data: breeds
    } = useXmlHttp(url);

    return (
        <>
            {error && <div>{error}</div>}
            {isLoading &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                </div>}
            {breeds && (breeds.length === 0
                    ? <p>Breeds were not found.</p>
                    : <div className="breed-row breed-row-header">
                        <div>Name</div>
                        <div>Size</div>
                        <div>Temperament</div>
                        <div>Origin</div>
                    </div>
            )}
            {breeds && (
                breeds.map((breed, index) => (
                    <div key={index} className="breed-row">
                        <div>{breed.name}</div>
                        <div>{breed.sizeID}</div>
                        <div>{breed.temperamentID}</div>
                        <div>{breed.originID}</div>
                    </div>
                ))
            )}
        </>
    );
};

export default Breeds;