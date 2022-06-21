//Lily Weber 6-20-2022

import {settings} from "../../config/config";
import {useAuth} from "../../services/useAuth";
import useAxios from "../../services/useAxios";
import {NavLink} from "react-router-dom";
import {useState, useEffect} from "react";
import useFetch from '../../services/useFetch';
import JSONPretty from 'react-json-pretty';
import "./breed.css";
import Breed from './breed.js';
import Pagination from "./pagination";

const Breeds = () => {
    const [url, setUrl] = useState(settings.baseApiUrl + "/breeds");
    const url_sizes = settings.baseApiUrl + "/sizes";
    const url_categories = settings.baseApiUrl + "/categories";
    const url_origins = settings.baseApiUrl + "/origins";
    const url_temp = settings.baseApiUrl + "/temperaments";
    const {user} = useAuth();

    //declare the data fetching function
    const {
        error,
        isLoading,
        data: prebreeds,
        search
    //} = useAxios(url, "GET", {Authorization: "Bearer " + user.jwt});
    } = useFetch();
    if(!prebreeds){
        search("");
    }
    const breeds = (()=>{

        if(prebreeds && (!prebreeds.hasOwnProperty("data"))){
            return {"data":prebreeds};
        }
        else{
            return prebreeds;
        }
    })();


    const {
        error: error_sizes,
        isLoading: isLoading_sizes,
        data: sizes
    } = useAxios(url_sizes, "GET", {Authorization: "Bearer " + user.jwt});

    const {
        error: error_category,
        isLoading: isLoading_category,
        data: categories
    } = useAxios(url_categories, "GET", {Authorization: "Bearer " + user.jwt});

    const {
        error: error_origins,
        isLoading: isLoading_origins,
        data: origins
    } = useAxios(url_origins, "GET", {Authorization: "Bearer " + user.jwt});

    const {
        error: error_temp,
        isLoading: isLoading_temp,
        data: temperaments
    } = useAxios(url_temp, "GET", {Authorization: "Bearer " + user.jwt});


    const [showBreed, setShowBreed] = useState(false);
    const handleBreedClick = () => setShowBreed(true);


   const getSizeName = (sizeID) => {
        let output = "Size not Found";
         if(sizes) {
             sizes.forEach((size) => {
                 if (size.sizeID == sizeID) {
                     output = size.sizeName;
                 }
             });
         }
        return output;
    };

   const getCategoryName = (categoryID) => {
       let output ="Category not found";
       if(categories){
           categories.data.forEach((category) =>{
               if(category.categoryID ==categoryID){
                   output = category.categoryName;
               }
           });
       }
       return output;
   };

    const getOriginName = (originID) => {
        let output ="Origin not found";
        if(origins){
            origins.forEach((origin) =>{
                if(origin.originID ==originID){
                    output = origin.originName;
                }
            });
        }
        return output;
    };

    const getTempName = (temperamentID) => {
        let output ="Temperament not found";
        if(temperaments){
            temperaments.forEach((temperament) =>{
                if(temperament.temperamentID ==temperamentID){
                    output = temperament.temperamentName;
                }
            });
        }
        return output;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const term = document.getElementById("breed-search-term").value;
        search(term);
    };

    const clearSearchBox = (e) => {
        e.preventDefault();
        document.getElementById("breed-search-term").value = "";
        search("");
    };

    return (
        <>
            {showBreed && <Breed show={showBreed} setShow={setShowBreed}/>}

            <div className="main-heading">
                <div className="container">All Breeds</div>
            </div>

            <div className="main-content container">
                {(error || error_sizes || error_category|| error_origins || error_temp) && <div>{error}</div>}
                {(isLoading || isLoading_sizes || isLoading_category || isLoading_origins || isLoading_temp) &&
                <div className="image-loading">
                    Please wait while data is being loaded
                    <img src={require(`../loading.gif`)} alt="Loading ......"/>
                </div>
                }
                <form style={{textAlign: "right", marginBottom: "3px"}} onSubmit={handleSearch}>
                    <input id="breed-search-term" placeholder="Enter search terms"/>
                    <button type="submit" className="button-light"
                            style={{marginLeft: "5px"}}>Search</button>
                    <button className="button-light" style={{marginLeft: "5px"}}
                            onClick={clearSearchBox}>Clear</button>
                </form>

                {breeds && sizes && categories && origins && temperaments &&
                <div className="course-container">
                    <div className="course-row course-row-header">
                        <div>Name</div>
                        <div>Size</div>
                        <div>Category</div>
                        <div>Temperament</div>
                        <div>Origin</div>
                    </div>
                    {breeds.data && breeds.data.map((breed) => (
                        <div key={breed.breedID} className="course-row">
                            <NavLink
                                className={({isActive}) => isActive ? "active" : ""}
                                to={`/breeds/${breed.breedID}`}
                                onClick={handleBreedClick}>
                                {breed.name}
                            </NavLink>
                            <div>{getSizeName(breed.sizeID)}</div>
                            <div>{getCategoryName(breed.categoryID)}</div>
                            <div>{getTempName(breed.temperamentID)}</div>
                            <div>{getOriginName(breed.originID)}</div>
                        </div>
                    ))}
                </div>}
                {breeds && <Pagination courses={breeds} setUrl={setUrl}/>}
            </div>

        </>
    );
};

export default Breeds;