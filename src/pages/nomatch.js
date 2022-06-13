/*
Name: Lily Weber
Date: 13-June-2022
File: home.js
Description: create the home page for the app.
*/


const Nomatch = () => {
    return (
        <>

            <div className="main-heading">
                <div className="container">Error</div>
            </div>
            <div className="sub-heading">
                <div className="container">404 Page Not Found</div>
            </div>
            <div className="main-content container">
                The page requested could not found. Please check your request and  try again.
            </div>


        </>
    );
};

export default Nomatch;