
/*
Name: Lily Weber
Date: 13-June-2022
File: home.js
Description: create the home page for the app.
*/



const Home = () => {
    return (
        <>

            <div className="main-heading">
                <div className="container">Welcome to Dog Breeds SPA</div>
            </div>

            <div className="main-content container">

                <p>
                    This application is an API client. Data of the application is provided by a API service called <strong>DogBreeds API</strong>.
                    The application uses four common HTTP methods for CRUD operations: <strong>GET, POST, PUT, and DELETE</strong>
                </p>

                <p>This application will allow you to view different dog breeds and various characteristics about them.</p>

                <p>Please click on the "Sign in" link to sign in and explore the site. If you don't already have an account,
                    please sign up and create a new account.</p>

            </div>

        </>
    );
};

export default Home;

