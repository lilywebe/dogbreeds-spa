//Daniel Todd
//6-15-2022
//useXmlHttp.js
//Sets up XML HTTP service for making requests from the SPA to the API

import {useState, useEffect} from 'react';

import React from 'react';

const UseXmlHttp = (url,
                    method = "GET",
                    headers = {}) => {
    headers = {
        ...{"Content-Type": "application/json"},
        ...headers
    };
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //useEffect function
    useEffect(() => {
        let request = new XMLHttpRequest();
        request.open(method, url, true);
        request.timeout = 2000;   // time in milliseconds
        for(let name in headers) { //set headers; there might be one or more headers
            request.setRequestHeader(name, headers[name]);
        }
        request.onload = () => {   // Request finished.
            setIsLoading(false)
            if (request.status === 200) {
                setData(JSON.parse(request.response));
            } else {
                console.log(request.status)
                setError("Status: " + request.status + "; Error: " + request.statusText);
            }
        }
        request.ontimeout = () => { // Request timed out.
            setIsLoading(false);
            setError("Error: The request has timed out.");
        }
        request.send();
    }, [url]); //resend the request whenever url has changed

    return {data, isLoading, error};

};

export default UseXmlHttp;